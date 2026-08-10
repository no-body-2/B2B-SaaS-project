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
import { PrismaService } from '../../prisma/prisma.service';
import type { Request } from 'express';

@Injectable()
export class SystemRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      SYSTEM_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as
      | { userId?: string; systemRole?: string }
      | undefined;

    if (!user || !user.userId) {
      throw new ForbiddenException('해당 작업에 관한 권한이 없습니다.');
    }

    let systemRole = user.systemRole;

    // 토큰의 systemRole이 혜택 요건 미충족이거나 'USER'일 경우 DB 실시간 조회 Fallback
    if (!systemRole || (systemRole === 'USER' && requiredRoles.includes('SUPER_ADMIN'))) {
      const dbUser = await this.prisma.user.findUnique({
        where: { id: user.userId },
        select: { systemRole: true },
      });
      if (dbUser) {
        systemRole = dbUser.systemRole;
        // 다음 미들웨어/컨트롤러 사용을 위해 request.user 갱신
        (request.user as { systemRole?: string }).systemRole = systemRole;
      }
    }

    if (!systemRole || !requiredRoles.includes(systemRole)) {
      throw new ForbiddenException('해당 작업에 관한 권한이 없습니다.');
    }

    return true;
  }
}
