// apps/api/src/auth/guards/workspace-policy.guard.ts

/**
 * Workspace Policy Guard
 *
 * @description
 * - Workspace 내에서의 활동에 대한 권한을 검사하는 Guard
 *
 * @author <nobody>
 * @date 2026-08-16
 */

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../../common/decorators/require-permissions.decorator';
import { BitmaskUtil } from '../utils/bitmasks.util';

export interface AuthenticatedUser {
  userId?: string;
  id?: string;
  workspacePermission?: Record<string, number>;
}

export interface RequestWithUser {
  user?: AuthenticatedUser;
  headers: Record<string, string | string[] | undefined>;
  params: Record<string, string | undefined>;
}

@Injectable()
export class WorkspacePolicyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredMask = this.reflector.getAllAndOverride<number>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 권한 설정이 없는 Endpoint의 경우 통과
    if (!requiredMask) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('인증되지 않은 사용자입니다.');
    }

    const headerWorkspaceId = request.headers['x-workspace-id'];
    const workspaceIdFromHeader = Array.isArray(headerWorkspaceId)
      ? headerWorkspaceId[0]
      : headerWorkspaceId;
    const workspaceIdFromParams = request.params?.workspaceId;
    const currentWorkspaceId =
      workspaceIdFromHeader || workspaceIdFromParams || '';

    // 사용자의 해당 워크스페이스 Bitmask 권한 조회
    let userMask = 0;
    const permissionsMap = user.workspacePermission;
    if (
      permissionsMap &&
      currentWorkspaceId &&
      Object.prototype.hasOwnProperty.call(permissionsMap, currentWorkspaceId)
    ) {
      const maskVal = permissionsMap[currentWorkspaceId];
      if (typeof maskVal === 'number') {
        userMask = maskVal;
      }
    }

    const hasAccess = BitmaskUtil.hasPermission(userMask, requiredMask);

    if (!hasAccess) {
      throw new ForbiddenException(
        `요청한 작업을 수행할 권한이 없습니다. (필요 권한: ${requiredMask}, 보유 권한: ${userMask})`,
      );
    }

    return true;
  }
}
