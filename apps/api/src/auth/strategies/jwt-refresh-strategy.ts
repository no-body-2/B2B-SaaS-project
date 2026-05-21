// apps/api/src/auth/strategies/jwt-refresh.strategy.ts

/**
 * JWT Refresh Strategy
 *
 * @description
 * JWT Refresh Token 재발급 설정
 *
 * @author <nobody>
 * @date 2026-05-20
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    const secret = process.env.JWT_REFRESH_SECRET;

    if (!secret) {
      throw new Error(
        '보안 에러: JWT_REFRESH_SECRET 환경 변수가 설정되지 않았습니다.',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      // validate 메서드에서 Client 측에서 전송한 Plain Text를 참조할 수 있게하는 옵션
      passReqToCallback: true,
    });
  }

  /**
   * JWT 서명 및 만료일 검증 후 호출되는 후처리 메서드
   *
   * @description
   * - 서비스 계층에서 DB의 Argon2로 해싱된 값과 비교할 수 있도록 RT를 함께 전달
   *
   * @param req - Express Request 객체 (헤더 추출용)
   * @param payload - JWT 복호화를 통해 추출된 데이터 객체
   * @returns 'req.user'에 할당되어 컨트롤러로 전달될 세션 데이터 객체
   */
  validate(req: Request, payload: { sub: string; email: string }) {
    const refreshToken = req
      .get('Authorization')
      ?.replace('Bearer ', '')
      .trim();

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh Token이 유효하지 않습니다.');
    }

    return {
      userId: payload.sub,
      email: payload.email,
      refreshToken,
    };
  }
}
