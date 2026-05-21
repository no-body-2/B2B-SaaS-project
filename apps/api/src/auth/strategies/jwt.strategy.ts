// apps/api/src/auth/strategies/jwt.strategy.ts

/**
 * Auth - JWT Strategy
 *
 * @description
 * JWT (JSON Web Token) 검사
 *
 * @author  <Nobody>
 * @date 2026-05-19
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const secret = process.env.JWT_ACCESS_SECRET;

    if (!secret) {
      throw new Error(
        '보안 에러: JWT_ACCESS_SECRET 환경 변수가 설정되지 않았습니다.',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  /**
   * JWT 검증
   *
   * @description
   * - 복호화된 토큰의 payload에서 식별자 정보를 추출 및 NestJS로 전달
   *
   * @param payload - JWT 디코딩을 통해 추출된 원본 데이터 객체
   * @returns 'req.user'에 할당되어 컨트롤러 계층으로 전달될 객체
   */
  validate(payload: { sub: string; email: string }) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
