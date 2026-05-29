// apps/api/src/workspace/workspace-member.service.ts

/**
 * Workspace Member Service
 *
 * @description
 * Workspace 모듈의 Member Service
 *
 * @author  <Nobody>
 * @date 2026-05-28
 */

import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  GoneException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InviteMemberDto } from './dto/member/invite-member.dto';
import { WorkspaceParamDto } from './dto/workspace-param.dto';
import { WorkspaceGuardService } from './workspace-guard.service';
import { createId } from '@paralleldrive/cuid2';
import { AcceptInvitationDto } from './dto/member/accept-invitation.dto';
import { WorkspaceMemberQueryDto } from './dto/member/workspace-member-query.dto';
import { Prisma } from '@b2b/database';
import { TargetMemberDto } from './dto/member/target-member.dto';
import { UpdateMemberRoleDto } from './dto/member/update-role.dto';

@Injectable()
export class WorkspaceMemberService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceGuard: WorkspaceGuardService,
  ) {}

  /**
   * WORKSPACE-MEMBER-001
   * 워크스페이스 멤버 초대
   * @description
   * - 권한 검증 및 초대 형식 유효성 및 중복 검사 후 1회용 초대 토큰 발급
   * @param userId - 초대 요청을 보낸 사용자의 ID
   * @param param - 워크스페이스 파라미터
   * @param dto - 초대 요청 DTO
   * @returns - 1회용 초대 토큰 및 초대 성공 메시지
   * @throws
   * - {ForbiddenException}: 사용자 권한이 없을 경우
   * - {NotFoundException}: 사용자가 워크스페이스에 존재하지 않을 경우
   * - {ConflictException}: 이미 초대된 사용자거나 이미 해당 워크스페이스에 소속된 사용자일 경우
   */
  async inviteWorkspaceMember(
    userId: string,
    param: WorkspaceParamDto,
    dto: InviteMemberDto,
  ) {
    const { workspaceId } = param;

    // 1. 권한 검증
    await this.workspaceGuard.verifyWorkspaceAdmin(userId, workspaceId);

    // 2. 대상 사용자 검색
    const targetUser = await this.prisma.user.findUnique({
      where: { id: dto.email },
    });

    // 3. 대상 사용자 워크스페이스 합류 여부 검사
    if (targetUser) {
      const isAlreadyMember = await this.prisma.workspaceMember.count({
        where: { workspaceId, userId: targetUser.id },
      });

      if (isAlreadyMember > 0) {
        throw new ConflictException(
          '이미 해당 워크스페이스에 소속된 사용자입니다.',
        );
      }
    }

    // 4. 중복 초대 여부 검사
    const activeInvitationCount = await this.prisma.workspaceInvitation.count({
      where: {
        workspaceId,
        targetEmail: dto.email,
        status: 'PENDING',
      },
    });

    if (activeInvitationCount > 0) {
      throw new ConflictException(
        '이미 초대된 사용자입니다. 초대 요청을 확인해주세요.',
      );
    }

    // 5. 토큰 및 만료 시간 설정
    const invitationToken = createId();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 6);

    // 6. 초대 요청 생성
    const newInvitation = await this.prisma.workspaceInvitation.create({
      data: {
        id: `inv-${createId()}`,
        workspaceId,
        inviterId: userId,
        targetEmail: dto.email,
        invitation: dto.invitation,
        token: invitationToken,
        status: 'PENDING',
        expiresAt,
      },
    });

    // TODO: 이메일 전송 부 추가
    // 7. 결과 반환
    return {
      message: '초대 요청이 성공적으로 전송되었습니다. 6시간 후 만료됩니다.',
      invitationId: newInvitation.id,
      workspaceId,
      invitedEmail: newInvitation.targetEmail,
      invitation: newInvitation.invitation,
      invitationToken,
      expiresAt: newInvitation.expiresAt,
    };
  }

  // TODO: Scheduler 를 통한 만료 기간 시 자동 삭제 or 자동 상태 변경 설정할 것
  // TODO: createId를 통해 생성한 ID 또한 중복의 우려가 있으므로 createId 메서드 실행 후 검증하는 부분을 추가할 것
  /**
   * WORKSPACE-MEMBER-002
   * 워크스페이스 초대 요청 수락
   * @description
   * - WORKSPACE-MEMBER-001 에서 발급된 1회용 인증 토큰을 검증 및 만료 시간 대조 후 DB 작업
   * @param userId - 초대 요청을 보낸 사용자의 ID
   * @param dto - 초대 요청 수락 확인 DTO
   * @returns - 가입 성공 메시지 및 신규 워크스페이스 멤버 정보
   * @throws
   * - {ForbiddenException}: 사용자 권한이 없을 경우
   * - {NotFoundException}: 사용자가 워크스페이스에 존재하지 않을 경우
   * - {ConflictException}: 이미 초대된 사용자거나 이미 해당 워크스페이스에 소속된 사용자일 경우
   */
  async acceptWorkspaceInvitation(userId: string, dto: AcceptInvitationDto) {
    const { invitationToken } = dto;

    const invitation = await this.prisma.workspaceInvitation.findUnique({
      where: { token: invitationToken },
    });

    if (!invitation) {
      throw new NotFoundException('유효하지 않은 초대 토큰입니다.');
    }

    if (invitation.status !== 'PENDING') {
      throw new BadRequestException(
        '이미 처리되었거나 유효하지 않은 요청입니다.',
      );
    }

    const now = new Date();
    if (invitation.expiresAt < now) {
      await this.prisma.workspaceInvitation.update({
        where: { id: invitation.id },
        data: { status: 'EXPIRED' },
      });
      throw new GoneException('초대 요청이 만료되었습니다.');
    }

    const currentUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!currentUser || currentUser.email !== invitation.targetEmail) {
      throw new ForbiddenException('유효하지 않은 초대 요청입니다.');
    }

    const isAlreadyMember = await this.prisma.workspaceMember.count({
      where: {
        workspaceId: invitation.workspaceId,
        userId: currentUser.id,
      },
    });

    if (isAlreadyMember > 0) {
      throw new ConflictException(
        '이미 해당 워크스페이스에 소속된 사용자입니다.',
      );
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.workspaceInvitation.update({
        where: { id: invitation.id },
        data: { status: 'ACCEPTED' },
      });

      await tx.workspaceMember.create({
        data: {
          workspaceId: invitation.workspaceId,
          userId: currentUser.id,
          role: 'MEMBER',
        },
      });
    });

    const workspace = await this.prisma.workspace.findUnique({
      where: { id: invitation.workspaceId },
      select: { id: true, name: true, description: true, logoUrl: true },
    });

    if (!workspace) {
      throw new NotFoundException('워크스페이스를 찾을 수 없습니다.');
    }

    return {
      message: `${workspace.name}에 팀원이 되신 것을 축하합니다.`,
      workspace,
    };
  }

  /**
   * WORKSPACE-MEMBER-003
   * 워크스페이스 멤버 목록 조회
   * @description
   * - 워크스페이스에 소속된 사용자의 목록을 조회
   * @param userId - 요청을 보낸 사용자의 ID
   * @param param - 워크스페이스 식별자
   * @param query - 페이지네이션 및 필터링 옵션 DTO
   * @returns - 조회 성공 메시지 및 워크스페이스 멤버 목록
   * @throws
   * - {ForbiddenException}: 사용자 권한이 없을 경우
   * - {NotFoundException}: 해당 워크스페이스가 존재하지 않을 경우
   */
  async getWorkspaceMembers(
    userId: string,
    param: WorkspaceParamDto,
    query: WorkspaceMemberQueryDto,
  ) {
    const { workspaceId } = param;
    const { page, size, keyword, role } = query;

    // 1. 권한 검증
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // 2. 동적 Where 조건절 정의
    const whereClause: Prisma.WorkspaceMemberWhereInput = {
      workspaceId,
      ...(role && { role }),
      ...(keyword && {
        user: {
          OR: [
            { firstName: { contains: keyword, mode: 'insensitive' } },
            { lastName: { contains: keyword, mode: 'insensitive' } },
            { email: { contains: keyword, mode: 'insensitive' } },
          ],
        },
      }),
    };

    // 3. DB 페이징 조회 쿼리 실행
    const [totalCount, members] = await Promise.all([
      this.prisma.workspaceMember.count({ where: whereClause }),
      this.prisma.workspaceMember.findMany({
        where: whereClause,
        skip: (page - 1) * size,
        take: size,
        orderBy: { joinedAt: 'asc' },
        select: {
          role: true,
          joinedAt: true,
          userId: true,
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
    ]);

    // 4. Total Pages 계산
    const totalPages = Math.ceil(totalCount / size);

    // 5. 응답 반환
    return {
      message: '워크스페이스 멤버 조회 성공',
      totalCount,
      currentPage: page,
      totalPages: totalPages === 0 ? 1 : totalPages,
      members: members.map((m) => ({
        userId: m.userId,
        firstname: m.user?.firstName ?? '',
        lastname: m.user?.lastName ?? '',
        email: m.user?.email ?? '',
        role: m.role ?? 'MEMBER',
        joinedAt: m.joinedAt,
      })),
    };
  }

  /**
   * WORKSPACE-MEMBER-004
   * 워크스페이스 멤버 권한 변경
   * @description
   * - 워크스페이스의 OWNER 권한을 가진 사용자가 타 사용자의 권한을 변경
   * @param userId - 요청 사용자의 ID
   * @param param - 워크스페이스 식별자
   * @param dto - 변경할 사용자의 권한 정보
   * @returns - 변경 성공 메시지 및 변경된 사용자 정보
   * @throws
   * - {BadRequestException}: 본인의 권한을 변경하려 시도하는 경우
   * - {ForbiddenException}: 사용자 권한이 없을 경우
   * - {NotFoundException}: 사용자가 워크스페이스에 존재하지 않을 경우
   */
  async updateMemberRole(
    userId: string,
    param: TargetMemberDto,
    dto: UpdateMemberRoleDto,
  ) {
    const { workspaceId, targetUserId } = param;
    const { newRole } = dto;

    // 1. 요청 사용자와 대상 사용자의 적합성 검사
    await this.workspaceGuard.verifyWorkspaceOwner(userId, workspaceId);
    await this.workspaceGuard.validateMembership(targetUserId, workspaceId);

    // 2. 본인의 권한 변경 방지
    if (userId === targetUserId) {
      throw new BadRequestException('본인의 권한을 변경할 수 없습니다.');
    }

    // 3. 권한 변경 시도
    const updatedMember = await this.prisma.workspaceMember.update({
      where: { workspaceId_userId: { workspaceId, userId: targetUserId } },
      data: { role: newRole },
    });

    // 4. 결과 반환
    return {
      message: '워크스페이스 멤버 권한 변경 성공',
      workspaceId: updatedMember.workspaceId,
      targetUserId: updatedMember.userId,
      updatedRole: updatedMember.role,
    };
  }

  /**
   * WORKSPACE-MEMBER-005
   * 워크스페이스 멤버 추방
   * @description
   * - 워크스페이스의 OWNER 권한을 가진 사용자가 타 사용자를 추방
   * @param userId - 요청 사용자의 ID
   * @param param - 워크스페이스 식별자
   * @returns - 추방 성공 메시지
   * @throws
   * - {BadRequestException}: 본인을 추방하려 시도하는 경우
   * - {ForbiddenException}: 사용자 권한이 없을 경우
   * - {NotFoundException}: 사용자가 워크스페이스에 존재하지 않거나 해당하는 워크스페이스를 찾을 수 없는 경우
   */
  async kickMember(userId: string, param: TargetMemberDto) {
    const { workspaceId, targetUserId } = param;

    await this.workspaceGuard.verifyWorkspaceOwner(userId, workspaceId);
    await this.workspaceGuard.validateMembership(targetUserId, workspaceId);

    if (userId === targetUserId) {
      throw new BadRequestException('본인을 추방할 수 없습니다.');
    }

    await this.prisma.workspaceMember.delete({
      where: { workspaceId_userId: { workspaceId, userId: targetUserId } },
    });

    return {
      message: '워크스페이스 멤버 추방 성공',
      workspaceId,
      targetUserId,
      kickedAt: new Date(),
    };
  }

  /**
   * WORKSPACE-MEMBER-006
   * 워크스페이스 나가기
   * @description
   * - 워크스페이스에 소속된 사용자가 스스로 워크스페이스 나가기 요청
   * @param userId - 요청 사용자의 ID
   * @param param - 워크스페이스 식별자
   * @returns - 나가기 성공 메시지
   * @throws
   * - {BadRequestException}: OWNER 권한을 가진 사용자가 권한 위임 없이 나가려는 경우
   * - {ForbiddenException}: 사용자가 워크스페이스에 소속되지 않은 경우
   * - {NotFoundException}: 사용자가 워크스페이스에 존재하지 않거나 해당하는 워크스페이스를 찾을 수 없는 경우
   */
  async leaveWorkspace(userId: string, param: WorkspaceParamDto) {
    const { workspaceId } = param;

    // 1. 사용자 워크스페이스 소속 여부 검증 및 정보 반환
    const membership = await this.workspaceGuard.validateMembership(
      userId,
      workspaceId,
    );

    // 2. OWNER 권한을 가진 사용자는 나가기 불가
    if (membership.role === 'OWNER') {
      throw new BadRequestException(
        '워크스페이스의 관리자는 워크스페이스를 나갈 수 없습니다.',
      );
    }

    // 3. 워크스페이스 멤버 삭제 처리 (Hard Delete)
    await this.prisma.workspaceMember.delete({
      where: { workspaceId_userId: { workspaceId, userId } },
    });

    // 4. 결과 반환
    return {
      message: '워크스페이스 나가기 성공',
      workspaceId,
      leftAt: new Date(),
    };
  }
}
