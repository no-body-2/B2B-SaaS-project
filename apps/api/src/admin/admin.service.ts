// apps/api/src/admin/admin.service.ts

/**
 * Admin Service
 *
 * @description
 * - Super Admin (System Developer) 전용 관리 서비스
 *
 * @author <nobody>
 * @date 2026-08-08
 */

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@luminano/database';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import * as argon2 from 'argon2';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * 1. Audit Log 기록
   *
   * @description
   * - 관리자의 조치(Action) 및 변경 이력을 DB에 기록
   *
   * @param adminId 관리자 사용자 ID
   * @param action 수행한 작업 명칭
   * @param targetId 대상 리소스 ID
   * @param details 세부 데이터
   * @param ipAddress IP 주소
   * @param userAgent User-Agent
   */
  async recordAuditLog(
    adminId: string,
    action: string,
    targetId?: string,
    details?: object,
    ipAddress?: string,
    userAgent?: string,
  ) {
    return this.prisma.auditLog.create({
      data: {
        adminId,
        action,
        targetId,
        details: details
          ? (JSON.parse(JSON.stringify(details)) as Prisma.InputJsonObject)
          : undefined,
        ipAddress,
        userAgent,
      },
    });
  }

  /**
   * 2. 대시보드 요약 통계 조회
   *
   * @description
   * - 전체 사용자, 전체 워크스페이스, 첨부 파일 수 및 S3 총 용량 반환
   */
  async getDashboardStats() {
    const [totalUsers, totalWorkspaces, totalFiles, totalStorageResult] =
      await Promise.all([
        this.prisma.user.count({ where: { deletedAt: null } }),
        this.prisma.workspace.count({ where: { deletedAt: null } }),
        this.prisma.fileAttachment.count(),
        this.prisma.fileAttachment.aggregate({ _sum: { size: true } }),
      ]);

    return {
      totalUsers,
      totalWorkspaces,
      totalFiles,
      totalStorageBytes: totalStorageResult._sum.size || 0,
    };
  }

  /**
   * 3. 유저 목록 조회
   *
   * @description
   * - 페이지네이션 및 검색 조건(이메일, 이름)에 맞춰 유저 목록 반환
   *
   * @param page 페이지 번호
   * @param limit 페이지 당 건수
   * @param search 검색 키워드
   */
  async getUsers(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { firstName: { contains: search, mode: 'insensitive' as const } },
            { lastName: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [items, totalCount] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          systemRole: true,
          provider: true,
          createdAt: true,
          deletedAt: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      items,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  /**
   * 4. 유저 권한 수정
   *
   * @description
   * - 지정된 사용자의 systemRole (예: SUPER_ADMIN) 수정
   *
   * @param adminId 요청한 관리자 ID
   * @param targetUserId 대상 유저 ID
   * @param systemRole 부여할 권한 문자열
   * @param ip IP 주소
   * @param userAgent User-Agent
   */
  async updateUserSystemRole(
    adminId: string,
    targetUserId: string,
    systemRole: string,
    ip?: string,
    userAgent?: string,
  ) {
    const targetUser = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });
    if (!targetUser)
      throw new NotFoundException('대상 사용자를 찾을 수 없습니다.');

    const updated = await this.prisma.user.update({
      where: { id: targetUserId },
      data: { systemRole },
      select: { id: true, email: true, systemRole: true },
    });

    await this.recordAuditLog(
      adminId,
      'USER_ROLE_UPDATE',
      targetUserId,
      { previousRole: targetUser.systemRole, newRole: systemRole },
      ip,
      userAgent,
    );
    return updated;
  }

  /**
   * 5. 유저 정지 / 복구
   *
   * @description
   * - 지정된 사용자의 Soft Delete(deletedAt) 상태를 전환
   *
   * @param adminId 요청한 관리자 ID
   * @param targetUserId 대상 유저 ID
   * @param ip IP 주소
   * @param userAgent User-Agent
   */
  async toggleUserStatus(
    adminId: string,
    targetUserId: string,
    ip?: string,
    userAgent?: string,
  ) {
    const targetUser = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });
    if (!targetUser)
      throw new NotFoundException('대상 사용자를 찾을 수 없습니다.');

    const isSoftDeleted = targetUser.deletedAt !== null;
    const updated = await this.prisma.user.update({
      where: { id: targetUserId },
      data: { deletedAt: isSoftDeleted ? null : new Date() },
    });

    await this.recordAuditLog(
      adminId,
      isSoftDeleted ? 'USER_RESTORE' : 'USER_SUSPEND',
      targetUserId,
      { email: targetUser.email },
      ip,
      userAgent,
    );
    return updated;
  }

  /**
   * 6. 워크스페이스 목록 조회
   *
   * @description
   * - 페이지네이션 및 검색 조건에 맞춰 전체 워크스페이스 목록 반환
   *
   * @param page 페이지 번호
   * @param limit 페이지 당 건수
   * @param search 검색 키워드
   */
  async getWorkspaces(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;
    const where = search
      ? { name: { contains: search, mode: 'insensitive' as const } }
      : {};

    const [items, totalCount] = await Promise.all([
      this.prisma.workspace.findMany({
        where,
        include: {
          _count: { select: { members: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.workspace.count({ where }),
    ]);

    return {
      items,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  /**
   * 7. 워크스페이스 정지 / 복구
   *
   * @description
   * - 워크스페이스의 Soft Delete(deletedAt) 상태 전환
   *
   * @param adminId 요청한 관리자 ID
   * @param workspaceId 대상 워크스페이스 ID
   * @param ip IP 주소
   * @param userAgent User-Agent
   */
  async toggleWorkspaceStatus(
    adminId: string,
    workspaceId: string,
    ip?: string,
    userAgent?: string,
  ) {
    const ws = await this.prisma.workspace.findUnique({
      where: { id: workspaceId },
    });
    if (!ws) throw new NotFoundException('워크스페이스를 찾을 수 없습니다.');

    const isDeleted = ws.deletedAt !== null;
    const updated = await this.prisma.workspace.update({
      where: { id: workspaceId },
      data: { deletedAt: isDeleted ? null : new Date() },
    });

    await this.recordAuditLog(
      adminId,
      isDeleted ? 'WORKSPACE_RESTORE' : 'WORKSPACE_DELETE',
      workspaceId,
      { name: ws.name },
      ip,
      userAgent,
    );
    return updated;
  }

  /**
   * 8. 감사 로그 목록 조회
   *
   * @description
   * - 시스템 감사 로그(Audit Log) 이력 최신순 반환
   *
   * @param page 페이지 번호
   * @param limit 페이지 당 건수
   * @param action 필터링할 액션 명칭
   */
  async getAuditLogs(page = 1, limit = 15, action?: string) {
    const skip = (page - 1) * limit;
    const where = action
      ? { action: { contains: action, mode: 'insensitive' as const } }
      : {};

    const [items, totalCount] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        include: {
          admin: { select: { email: true, firstName: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      items,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  /**
   * 9. SUDO 비밀번호 재인증
   *
   * @description
   * - 현재 관리자의 비밀번호를 검증하고 Sudo 타임스탬프 반환
   *
   * @param adminId 요청한 관리자 ID
   * @param passwordInput 입력한 비밀번호
   * @param ip IP 주소
   * @param userAgent User-Agent
   */
  async verifySudoPassword(
    adminId: string,
    passwordInput: string,
    ip?: string,
    userAgent?: string,
  ) {
    const admin = await this.prisma.user.findUnique({ where: { id: adminId } });
    if (!admin || !admin.password)
      throw new UnauthorizedException('인증 정보가 올바르지 않습니다.');

    const isValid = await argon2.verify(admin.password, passwordInput);
    if (!isValid)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    await this.recordAuditLog(
      adminId,
      'SUDO_VERIFY_SUCCESS',
      adminId,
      undefined,
      ip,
      userAgent,
    );
    return { sudoVerifiedAt: Date.now() };
  }

  /**
   * 10. User Impersonation (사용자 대행 로그인)
   *
   * @description
   * - 지정된 대상 사용자로 대행 로그인할 수 있는 JWT 토큰 생성
   *
   * @param adminId 요청한 관리자 ID
   * @param targetUserId 대행할 유저 ID
   * @param ip IP 주소
   * @param userAgent User-Agent
   */
  async impersonateUser(
    adminId: string,
    targetUserId: string,
    ip?: string,
    userAgent?: string,
  ) {
    const targetUser = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });
    if (!targetUser)
      throw new NotFoundException('대상 유저를 찾을 수 없습니다.');

    await this.recordAuditLog(
      adminId,
      'USER_IMPERSONATE',
      targetUserId,
      { targetEmail: targetUser.email },
      ip,
      userAgent,
    );

    const payload = {
      sub: targetUser.id,
      email: targetUser.email,
      systemRole: targetUser.systemRole,
      impersonatedBy: adminId,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    return { accessToken, targetUser };
  }

  /**
   * 11. 대용량 유저 CSV 스트리밍 다운로드
   *
   * @description
   * - 전체 유저 정보를 UTF-8 BOM 인코딩을 적용한 CSV 스트림으로 응답
   *
   * @param res Express Response 객체
   */
  async exportUsersCsv(res: Response) {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        systemRole: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="users_export.csv"',
    );

    res.write('\uFEFF');
    res.write('ID,Email,Name,SystemRole,CreatedAt\n');

    for (const u of users) {
      const line = `"${u.id}","${u.email || ''}","${u.firstName}","${u.systemRole}","${u.createdAt.toISOString()}"\n`;
      res.write(line);
    }
    res.end();
  }

  /**
   * 12. 전역 공지 및 점검 모드 등록
   *
   * @description
   * - 전체 플랫폼 유저에게 노출될 전역 공지/점검 공지 등록
   *
   * @param adminId 요청한 관리자 ID
   * @param title 공지 제목
   * @param content 공지 내용
   * @param type 공지 유형 ('INFO' | 'MAINTENANCE')
   * @param ip IP 주소
   * @param userAgent User-Agent
   */
  async createSystemNotice(
    adminId: string,
    title: string,
    content: string,
    type: 'INFO' | 'MAINTENANCE',
    ip?: string,
    userAgent?: string,
  ) {
    const notice = await this.prisma.systemNotice.create({
      data: { title, content, type, isActive: true },
    });

    await this.recordAuditLog(
      adminId,
      'SYSTEM_NOTICE_CREATE',
      notice.id,
      { title, type },
      ip,
      userAgent,
    );
    return notice;
  }
}
