// apps/api/src/auth/guards/jwt-refresh-guard.ts

/**
 * JWT Refresh Guard
 *
 * @description
 * JWT Refresh Strategy와 매핑되는 전용 Guard
 *
 * @author <nobody>
 * @date 2026-05-20
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {}
