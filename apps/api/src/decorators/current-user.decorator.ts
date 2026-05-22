// apps/api/src/auth/decorators/current-user.decorator.ts

/**
 * Current User Custom Decorator
 *
 * @description
 * Passport Guard를 통과한 후 req.user에 주입된 현재 인증된 사용자의 정보를 담은 객체를 반환하는 데코레이터
 *
 * @author <nobody>
 * @date 2026-05-21
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user;
  },
);
