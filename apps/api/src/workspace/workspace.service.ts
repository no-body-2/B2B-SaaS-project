// apps/api/src/workspace/workspace.service.ts

/**
 * Workspace Service
 *
 * @description
 * Workspace 모듈의 Service
 *
 * @author  <Nobody>
 * @date 2026-05-26
 */

import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceParamDto } from './dto/workspace-param.dto';

@Injectable()
export class WorkspaceService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * WORKSPACE-CORE-001
   * 워크스페이스 생성
   * @description
   * - 정상적으로 로그인한 사용자가 요청한 워크스페이스를 생성
   * @remarks
   * - 하나의 사용자는 3개 이상의 워크스페이스를 소유할 수 없음
   * @param userId - 사용자 ID
   * @param dto - 생성할 워크스페이스의 정보가 담긴 DTO
   * @returns - 생성된 워크스페이스 상태 및 생성 성공 메시지
   * @throws
   * - {ForbiddenException} - 사용자가 이미 3개 이상의 워크스페이스를 소유하고 있는 경우
   */
  async createWorkspace(userId: string, dto: CreateWorkspaceDto) {
    // 1. 소유 제한 검증
    const ownedCount = await this.prisma.workspaceMember.count({
      where: { userId, role: 'OWNER' },
    });

    if (ownedCount >= 3) {
      throw new ForbiddenException(
        '하나의 계정은 3개 이상의 워크스페이스를 소유할 수 없습니다.',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const workspaceId = `w-${createId()}`;

      const workspace = await tx.workspace.create({
        data: {
          id: workspaceId,
          name: dto.name,
          description: dto.description,
          logoUrl: dto.logoUrl,
        },
      });

      await tx.workspaceMember.create({
        data: {
          workspaceId,
          userId,
          role: 'OWNER',
        },
      });

      return {
        message: '워크스페이스가 생성되었습니다.',
        workspace: {
          id: workspace.id,
          name: workspace.name,
          description: workspace.description,
          logoUrl: workspace.logoUrl,
          createdAt: workspace.createdAt,
        },
      };
    });
  }

  /**
   * WORKSPACE-CORE-002
   * 워크스페이스 조회
   * @description
   * - 현재 사용자가 소속되어있는 (본인 소유 포함) 워크스페이스의 목록과 기본 정보를 조회
   * @param userId - 사용자 ID
   */
  async getUsersWorkspaces(userId: string) {
    // 1. 교차 테이블 WorkspaceMember 기준으로 쿼리
    const memberRecords = await this.prisma.workspaceMember.findMany({
      where: { userId },
      include: { workspace: true },
      orderBy: { workspace: { createdAt: 'desc' } },
    });

    // 2. 비어있는 경우 빈 배열 조기 반환
    if (memberRecords.length === 0) {
      return {
        workspaces: [],
      };
    }

    // 3. 반환 데이터 규격에 맞춰 포맷
    const formattedWorkspaces = memberRecords.map((record) => ({
      id: record.workspace.id,
      name: record.workspace.name,
      description: record.workspace.description,
      logoUrl: record.workspace.logoUrl,
      role: record.role,
      createdAt: record.workspace.createdAt,
    }));

    return {
      workspaces: formattedWorkspaces,
    };
  }

  /**
   * WORKSPACE-CORE-003
   * 워크스페이스 상세 조회
   * @description
   * - 특정 워크스페이스에 소속된 사용자가 해당 워크스페이스의 상세 정보를 조회
   * @param userId - 사용자 ID
   * @param param - URL 경로로 전달된 워크스페이스 식별자 모음
   * @returns - 반환될 워크스페이스 정보
   * @throws
   * - {ForbiddenException} - 워크스페이스에 소속되어 있지 않은 경우
   * - {NotFoundException} - 해당하는 워크스페이스를 찾을 수 없는 경우
   */
  async getWorkspaceDetail(userId: string, param: WorkspaceParamDto) {
    // 1. 워크스페이스 ID 추출
    const { workspaceId } = param;

    // 2. 워크스페이스 존재 여부 확인
    const workspaceExists = await this.prisma.workspace.count({
      where: { id: workspaceId },
    });
    if (workspaceExists === 0) {
      throw new NotFoundException('해당하는 워크스페이스를 찾을 수 없습니다.');
    }

    // 3. 사용자가 해당 워크스페이스에 소속되어 있는 상태인지 확인
    const membership = await this.prisma.workspaceMember.findUnique({
      where: { workspaceId_userId: { workspaceId, userId } },
    });

    if (!membership) {
      throw new ForbiddenException(
        '해당 워크스페이스의 정보를 조회할 권한이 없습니다.',
      );
    }

    // 4. 반환할 데이터 추출 Promise.all 사용
    const [workspaceDetail, totalMemberCount] = await Promise.all([
      this.prisma.workspace.findUnique({
        where: { id: workspaceId },
      }),
      this.prisma.workspaceMember.count({
        where: { workspaceId },
      }),
    ]);

    if (!workspaceDetail) {
      throw new NotFoundException(
        '해당하는 워크스페이스의 정보를 불러오는 중 오류가 발생했습니다.',
      );
    }

    // 5. 총 멤버 수와 조회를 요청한 사용자의 Role을 포함하여 결과 반환
    return {
      id: workspaceDetail.id,
      name: workspaceDetail.name,
      description: workspaceDetail.description,
      logoUrl: workspaceDetail.logoUrl,
      role: membership.role,
      totalMemberCount,
      createdAt: workspaceDetail.createdAt,
    };
  }
}
