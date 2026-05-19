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

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly prisma: PrismaService) {
    // 1. 환경 변수 검증
    const secret = process.env.JWT_ACCESS_SECRET;

    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET 환경 변수가 설정되지 않았습니다.');
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
   * JWT (JSON Web Token) 검증 및 사용자 정보 반환
   * @param payload
   * @returns 사용자 정보 (password 제외)
   */
  async validate(payload: { sub: string; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || user.deletedAt !== null) {
      throw new UnauthorizedException(
        '접근 권한이 없거나 유효하지 않은 계정입니다.',
      );
    }

    const { password: _, ...result } = user;

    return result;
  }
}
