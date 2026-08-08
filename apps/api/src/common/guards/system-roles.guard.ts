// apps/api/src/common/guards/system-roles.guard.ts

/**
 * System Roles Guard
 *
 * @description
 * - Super Admin (System Developer) 권한 검증 Guard
 *
 * @author <nobody>
 * @date 2026-08-08 (International Cat Day! 🐈)
 */

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SYSTEM_ROLES_KEY } from '../decorators/system-roles.decorator';
import type { Request } from 'express';

@Injectable()
export class SystemRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      SYSTEM_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { systemRole?: string } | undefined;

    if (!user || !user.systemRole || !requiredRoles.includes(user.systemRole)) {
      throw new ForbiddenException('해당 작업에 관한 권한이 없습니다.');
    }

    return true;
  }
}
