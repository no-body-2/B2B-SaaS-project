// apps/api/src/workspace/workspace-guard.service.ts

/**
 * Workspace Guard Service
 * @description
 * - 워크스페이스 관련 소속 검증 및 권한 검증
 *
 * @author  <Nobody>
 * @date 2026-05-28
 */

import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class WorkspaceGuardService {
  private cachedMembership: any = null;

  constructor(private readonly prisma: PrismaService) {}

  /**
   * 워크스페이스 멤버십 유효성 검사
   * @description
   * - 요청 사용자가 해당 워크스페이스에 소속된 상태인 지 검증
   * @param userId - 사용자 ID
   * @param workspaceId - 워크스페이스 ID
   * @returns - 해당 멤버십 정보
   * @throws
   * - {NotFoundException}: 해당 워크스페이스에 소속되지 않은 경우
   */
  async validateMembership(userId: string, workspaceId: string) {
    if (
      this.cachedMembership &&
      this.cachedMembership.userId === userId &&
      this.cachedMembership.workspaceId === workspaceId
    ) {
      return this.cachedMembership;
    }

    const membership = await this.prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: { workspaceId, userId },
      },
      include: {
        user: true,
      },
    });

    if (!membership) {
      throw new NotFoundException(
        '해당 워크스페이스에 소속되지 않은 사용자입니다.',
      );
    }

    this.cachedMembership = membership;
    return membership;
  }

  /**
   * Verify Workspace Owner
   * @description
   * - 요청 사용자가 해당 워크스페이스의 소유자인지 확인
   * @param userId
   * @param workspaceId
   * @returns - 해당 멤버십 정보
   * @throws
   * - {ForbiddenException}: 워크스페이스 소유자 권한이 없는 경우
   */
  async verifyWorkspaceOwner(userId: string, workspaceId: string) {
    const membership = await this.validateMembership(userId, workspaceId);

    if (membership.role !== 'OWNER') {
      throw new ForbiddenException('워크스페이스 소유자 권한이 없습니다.');
    }

    return membership;
  }

  /**
   * Verify Workspace Owner or Admin
   * @description
   * - 요청 사용자가 해당 워크스페이스의 소유자이거나 관리자인지 확인
   * @param userId
   * @param workspaceId
   * @returns - 해당 멤버십 정보
   * @throws
   * - {ForbiddenException}: 워크스페이스 소유자 혹은 관리자 권한이 없는 경우
   */
  async verifyWorkspaceAdmin(userId: string, workspaceId: string) {
    const membership = await this.validateMembership(userId, workspaceId);

    if (membership.role !== 'OWNER' && membership.role !== 'ADMIN') {
      throw new ForbiddenException('워크스페이스 관리자 권한이 없습니다.');
    }

    return membership;
  }
}
