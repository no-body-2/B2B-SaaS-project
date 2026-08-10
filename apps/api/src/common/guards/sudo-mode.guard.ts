// apps/api/src/common/guards/sudo-mode.guard.ts

/**
 * Sudo Mode Guard
 *
 * @description
 * - 민감 작업 시 일정 시간 내 비밀번호 재인증 요구
 *
 * @author <nobody>
 * @date 2026-08-08 (International Cat Day! 🐈)
 */

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_SUDO_MODE_KEY } from '../decorators/sudo-mode.decorator';
import type { Request } from 'express';

@Injectable()
export class SudoModeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isSudoRequired = this.reflector.getAllAndOverride<boolean>(
      IS_SUDO_MODE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isSudoRequired) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const sudoVerifiedAt = request.headers['x-sudo-verified-at'];

    if (!sudoVerifiedAt) {
      throw new UnauthorizedException(
        '민감 작업 수행을 위해 Password 재확인이 필요합니다.',
      );
    }

    const FIVE_MINUTES_MS = 5 * 60 * 1000;
    const isExpired = Date.now() - Number(sudoVerifiedAt) > FIVE_MINUTES_MS;

    if (isExpired) {
      throw new UnauthorizedException(
        '인증 유효시간 (5분)이 초과되었습니다. Password 재확인이 필요합니다.',
      );
    }

    return true;
  }
}
