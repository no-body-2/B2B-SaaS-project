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
        '보안 에러: JWT_REFRESH_SECRET 환경 변수가 누락되었습니다.',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      // Client 측에서 전송된 토큰 문자열 자체를 참조 가능하게 하는 설정
      passReqToCallback: true,
    });
  }

  /**
   * Refresh Token 서명 검증 통과 시 실행
   * @param req - Express Request 객체, passReqToCallback 옵션을 사용하기 때문에 사용 가능
   * @param payload - 토큰 검증에 필요한 정보
   * @returns 토큰과 payload로 전달된 사용자 정보
   */
  validate(req: Request, payload: { sub: string; email: string }) {
    // Header에서 Nearer 토큰 문자열 추출
    const refreshToken = req
      .get('Authorization')
      ?.replace('Bearer ', '')
      .trim();

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh Token이 존재하지 않습니다.');
    }

    // Service 계층의 로직에서 검증을 진행하도록 데이터 전달
    return {
      userId: payload.sub,
      email: payload.email,
      refreshToken,
    };
  }
}
