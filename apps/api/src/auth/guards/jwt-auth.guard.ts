// apps/api/src/auth/guards/jwt-auth.guard.ts

/**
 * JWT Auth Guard
 *
 * @description
 * JWT 인증을 처리하는 Guard
 *
 * @author <nobody>
 * @date 2026-05-21
 */

import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // NestJS 프레임워크의 Metadata 읽기 도구: Reflector 주입
  constructor(private readonly reflector: Reflector) {
    super();
  }

  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // @Public 데코레이터가 있을 시 토큰 검사 통과
    if (isPublic) {
      return true;
    }

    // @Public 데코레이터가 없을 시 토큰 검사 진행
    return super.canActivate(context);
  }
}
