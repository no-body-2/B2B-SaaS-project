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

import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { createId } from '@paralleldrive/cuid2';

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
}
