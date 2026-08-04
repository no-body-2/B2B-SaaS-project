// apps/api/src/auth/token.helper.ts

/**
 * Auth - Token Helper
 * @description
 * - JWT 관련 중복 작업을 별도의 Helper 파일로 분리
 *
 * @author  <Nobody>
 * @date 2026-06-05
 */

import { Injectable } from '@nestjs/common';
import { User } from '@luminano/database';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { createId } from '@paralleldrive/cuid2';
import { appConfig } from '../../common/config/app.config';

@Injectable()
export class TokenHelper {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 사용자 식별자 정보(User)를 전달받아 토큰 생성 및 DB에 Refresh Token 저장
   *
   * @param user - Prisma User 객체
   * @param ipAddress - 접속한 Client IP 주소 (보안 로그용)
   * @param userAgent - 접속한 Client 브라우저 및 디바이스 정보 (보안 로그용)
   * @returns - 사용자 정보 (민감 정보 제외) & JWT Access Token이 담긴 객체
   */
  async generateAndSaveTokens(
    user: User,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const accessSecret = appConfig.jwtAccessSecret;
    const refreshSecret = appConfig.jwtRefreshSecret;

    // 1. Payload에 비밀번호 등의 민감한 정보를 제외한 최소한의 식별자 전달
    const accessTokenPayload = { sub: user.id, email: user.email };

    // 2. Access Token 생성 (1시간)
    const accessToken = await this.jwtService.signAsync(accessTokenPayload, {
      secret: accessSecret,
      expiresIn: '1h',
    });

    // 2-1. JTI 생성
    const jti = createId();
    const refreshTokenPayload = { ...accessTokenPayload, jti };

    // 3. Refresh Token 생성 (7일)
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
      secret: refreshSecret,
      expiresIn: '7d',
    });

    // 4. Argon2를 사용하여 Refresh Token 해싱
    const hashedRefreshToken = await argon2.hash(refreshToken);

    // 5. 현재 시간 기준 7일 후로 만료 기간 설정
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // 6. DB에 세션 정보와 토큰 저장
    await this.prisma.refreshToken.create({
      data: {
        user: { connect: { id: user.id } },
        hashedToken: hashedRefreshToken,
        ipAddress: ipAddress || 'Unknown',
        userAgent: userAgent || 'Unknown',
        jti,
        expiresAt,
      },
    });

    // 7. Token & User 정보 (비밀번호 제외) 반환
    const { password: _, ...userInfo } = user;
    return {
      user: userInfo,
      accessToken,
      refreshToken,
    };
  }
}
