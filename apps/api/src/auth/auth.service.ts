// apps/api/src/auth/auth.service.ts

/**
 * Auth Service
 *
 * @description
 * Auth 모듈의 Service
 *
 * @author  <Nobody>
 * @date 2026-05-15
 */

import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2'; // bcrypt 대신 보안성이 더 훌륭한 (CPU 연산 뿐 아니라 RAM마저 소모해야함) argon2 사용
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { GoogleLoginDto } from './dto/google-login.dto';
import { User } from '@b2b/database';

@Injectable()
export class AuthService {
  // googleClient 선언
  private googleClient: OAuth2Client;

  // 생성자 (Constructor)
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    this.googleClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );
  }

  /**
   * AUTH-LOCAL-001
   * @description
   * - 신규 사용자 생성 및 비밀번호를 해싱하여 DB에 저장
   * @param dto - Client 측에서 검증을 마친 회원가입 데이터
   * @returns DB에 저장된 유저 객체 (password 필드 제외)
   * @throws
   * - {BadRequestException} - 필수 입력값 누락, 비밀번호 형식 불일치 등 유효성 검사 실패 시
   * - {ConflictException} - 이미 사용 중인 이메일로 가입을 시도할 경우
   *
   * @todo
   * - api/v2 코드를 생성할 시, Table에 nickname 항목을 추가할 것
   */
  async registerUser(dto: RegisterDto) {
    // 1. 이메일 중복 검증
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('이미 사용 중인 이메일입니다.');
    }

    // 2. 비밀번호 단방향 암호화 (Argon2 사용)
    const hashedPassword: string = await argon2.hash(dto.password);

    // 3. Prisma를 통해 DB에 데이터 저장
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        provider: 'local', // dto 검증 완료 후 default: local 저장
      },
    });

    // 4. Client에게 정보를 반환하기 전 password 제외
    const { password: _, ...result } = newUser;

    return result;
  }

  /**
   * AUTH-LOCAL-002
   * @description
   * - 사용자 인증 (로그인) 및 서비스 접근을 위한 JWT Access Token 발급
   * @remarks
   * - 보안을 위해 이메일 존재 여부, 비밀번호 일치 여부와 상관없이 UnauthorizedException 발생
   * @param dto - Client 측에서 검증을 마친 로그인 데이터
   * @param ipAddress - 접속한 Client Ip 주소
   * @param userAgent - 접속한 Client 브라우저 및 디바이스 정보 (보안 로그용)
   * @returns 사용자 정보 (password 제외) & JWT Access Token이 담긴 객체
   * @throws
   * - {UnauthorizedException} - 이메일 또는 비밀번호가 올바르지 않은 경우
   * - {ForbiddenException} - 현재 탈퇴 대기 중인 계정인 경우
   */
  async loginUser(dto: LoginDto, ipAddress?: string, userAgent?: string) {
    // 1. 이메일로 사용자 찾기
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // 소프트웨어의 보안을 위하여 이메일, 패스워드 중 잘못된 부분을 알려주지 않음
    if (!user) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    // 2. 사용자의 계정 활성 상태 확인
    if (user.deletedAt !== null) {
      throw new ForbiddenException('현재 탈퇴 대기 중인 계정입니다.');
    }

    if (user.provider !== 'local' || !user.password) {
      throw new UnauthorizedException(
        'Local 가입 사용자가 아닙니다. Social 로그인 기능을 이용해주세요.',
      );
    }

    // 3. Argon2로 비밀번호 검증
    const isPasswordValid = await argon2.verify(user.password, dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    return this.generateAndSaveTokens(user, ipAddress, userAgent);
  }

  /**
   * AUTH-SOCIAL-001
   * @description
   * - Google OAuth를 통한 사용자 인증 (로그인) 및 서비스 접근을 위한 JWT Access Token 발급
   * @param dto - Client 측에서 검증을 마친 로그인 데이터
   * @param ipAddress - 접속한 Client Ip 주소
   * @param userAgent - 접속한 Client 브라우저 및 디바이스 정보 (보안 로그용)
   * @returns 사용자 정보 (민감 정보 제외) & JWT Access Token이 담긴 객체
   * @throws
   * - {BadRequestException} - Google 인가 코드가 유효하지 않거나 통신에 문제가 있는 경우
   * - {ForbiddenException} - 현재 탈퇴 대기 중인 계정인 경우
   */
  async googleLogin(
    dto: GoogleLoginDto,
    ipAddress?: string,
    userAgent?: string,
  ) {
    let payload;

    // 1. Google Server와의 통신부
    try {
      const { tokens } = await this.googleClient.getToken(dto.code);
      const ticket = await this.googleClient.verifyIdToken({
        idToken: tokens.id_token!,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch {
      throw new BadRequestException(
        '유효하지 않은 Google 인가 코드이거나 통신에 문제가 있습니다.',
      );
    }

    // 2. payload 검증
    if (!payload || !payload.email) {
      throw new BadRequestException('Google 사용자 정보를 불러올 수 없습니다.');
    }

    const email = payload.email;
    const firstName = payload.given_name || '';
    const lastName = payload.family_name || '';

    // 3. user 검증
    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    // 4. 가입하지 않은 사용자의 경우 사용자 등록
    if (!user) {
      user = await this.prisma.user.create({
        data: { email, firstName, lastName, provider: 'google' },
      });
    } else {
      if (user.deletedAt !== null) {
        throw new ForbiddenException('현재 탈퇴 대기 중인 사용자입니다.');
      }
    }

    return this.generateAndSaveTokens(user, ipAddress, userAgent);
  }

  /**
   * AUTH-TOKEN-001
   * @description
   * - Refresh Token을 사용하여 새로운 Access Token을 발급
   * @remarks
   * - 기존에 사용된 Refresh Token은 DB에서 즉시 삭제하여 탈취, 재사용 가능성 차단
   * @param userId - JWTRefreshStrategy에서 복호화하여 전달한 사용자 고유 식별자 (CUID)
   * @param refreshToken - Client 측에서 Header를 통해 전달된 Refresh Token 문자열
   * @param ipAddress - 재발급 요청을 보낸 Client IP 주소
   * @param userAgent - 재발급 요청을 보낸 Client 기기 및 브라우저 정보
   * @returns 신규 발급된 사용자 정보 및 새로운 AT/RT
   * @throws
   * - {UnauthorizedException} - 유효하지 않은 Refresh Token, 만료된 Refresh Token
   * - {ForbiddenException} - 탈퇴 대기 중인 사용자의 요청인 경우
   */
  async refreshTokens(
    userId: string,
    refreshToken: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    // 1. 사용자 상태 조회
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException(
        '존재하지 않거나 유효하지 않은 사용자 계정입니다.',
      );
    }

    // 2. 사용자 탈퇴 대기 여부 검증
    if (user.deletedAt !== null) {
      throw new ForbiddenException(
        '탈퇴 대기 중인 사용자는 토큰 재발급이 불가능합니다.',
      );
    }

    // 3. 해당 사용자에게 발급된 활성 상태의 토큰 조회
    const activeTokens = await this.prisma.refreshToken.findMany({
      where: {
        userId: user.id,
        expiresAt: { gt: new Date() }, // 만료되지 않은 토큰만 조회
      },
    });

    // 4. Client에서 전달 된 Token과 DB의 Token 해시값 검증
    let validTokenSession;
    for (const session of activeTokens) {
      const isMatched = await argon2.verify(session.hashedToken, refreshToken);
      if (isMatched) {
        validTokenSession = session;
        break;
      }
    }
    if (!validTokenSession) {
      throw new UnauthorizedException(
        '유효하지 않거나 이미 만료된 토큰입니다. 다시 로그인해 주세요.',
      );
    }
    // 5. 토큰 탈취 방지를 위한 기존 Refresh Token 삭제
    await this.prisma.refreshToken.delete({
      where: { id: validTokenSession.id },
    });

    return this.generateAndSaveTokens(user, ipAddress, userAgent);
  }

  /**
   * AUTH-TOKEN-002
   * @description
   * - 로그아웃: 현재 사용자의 활성화된 세션 종료 및 토큰 파기
   * @param userId - Guard를 통과 후 추출된 사용자 고유 식별자 (CUID)
   * @param refreshToken - 사용자가 보유한 Refresh Token
   * @returns Logout 성공 메시지
   * @throws UnauthorizedException - 유효하지 않은 Refresh Token일 경우
   */
  async logout(userId: string, refreshToken: string) {
    // 1. 사용자가 보유한 만료되지 않은 모든 세션 조회
    const activeSessions = await this.prisma.refreshToken.findMany({
      where: {
        userId,
        expiresAt: { gt: new Date() },
      },
    });

    // 2. 현재 기기의 Token과 DB의 해시값 비교
    let targetSessionId: string | null = null;
    for (const session of activeSessions) {
      const isMatched = await argon2.verify(session.hashedToken, refreshToken);
      if (isMatched) {
        targetSessionId = session.id;
        break;
      }
    }

    // 3. 일치하는 세션이 없는 경우 이미 로그아웃 상태이거나 위조된 세션이므로 오류 반환
    if (!targetSessionId) {
      throw new UnauthorizedException(
        '이미 로그아웃되었거나 유효하지 않은 세션입니다.',
      );
    }

    // 4. 해당 기기의 세션을 DB에서 영구 삭제
    await this.prisma.refreshToken.delete({
      where: { id: targetSessionId },
    });

    return {
      message: '로그아웃 성공',
    };
  }

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
  private async generateAndSaveTokens(
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
