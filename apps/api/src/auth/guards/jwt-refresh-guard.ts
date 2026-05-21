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

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  /**
   * Passport의 인증 결과를 최종 처리 및 요청 통과 여부 결정 메서드
   *
   * @param err - Passport 검증 과정에서 발생한 런타임 에러
   * @param user - 인증에 성공한 사용자 정보
   * @param info - 인증 결과 정보 메타데이터 객체
   */
  override handleRequest<TUser = any>(
    err: unknown,
    user: TUser | false,
    info: Error | undefined,
  ) {
    if (err || !user) {
      const errorMessage =
        info?.message === 'No auth token'
          ? 'Authorization Header에 Refresh Token이 누락되었습니다.'
          : info?.message || '인증 세션이 유효하지 않습니다.';

      throw new UnauthorizedException(errorMessage);
    }
    return user;
  }
}
