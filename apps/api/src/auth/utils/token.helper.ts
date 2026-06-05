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
import { User } from '@b2b/database';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class TokenHelper {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * AUTH - Generate And Save Token
   * @description
   * - Local or Social 로그인을 시도하는 사용자에 대한 JWT Access Token & Refresh Token 발급 및 저장
   * @remakrs
   * - Local 로그인과 Social 로그인의 공통 로직이므로 별도의 메서드로 리팩터링
   * @param user - Local or Social 로그인을 시도하는 사용자의 정보
   * @param ipAddress - 접속한 Client Ip 주소
   * @param userAgent - 접속한 Client 브라우저 및 디바이스 정보 (보안 로그용)
   * @returns - 사용자 정보 (민감 정보 제외) & JWT Access Token이 담긴 객체
   */
  async generateAndSaveTokens(
    user: User,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!accessSecret || !refreshSecret) {
      throw new Error(
        '보안 오류: JWT Secret Key 환경 변수가 설정되지 않았습니다.',
      );
    }

    // 1. Payload에 비밀번호 등의 민감한 정보를 제외한 최소한의 식별자 전달
    const payload = { sub: user.id, email: user.email };

    // 2. Access Token 생성 (1시간)
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: accessSecret,
      expiresIn: '1h',
    });

    // 3. Refresh Token 생성 (7일)
    const refreshToken = await this.jwtService.signAsync(payload, {
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
