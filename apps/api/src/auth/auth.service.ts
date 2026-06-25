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
import { OAuth2Client } from 'google-auth-library';
import { GoogleLoginDto } from './dto/google-login.dto';
import { TokenHelper } from './utils/token.helper';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class AuthService {
  // googleClient 선언
  private googleClient: OAuth2Client;

  // 생성자 (Constructor)
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenHelper: TokenHelper,
    private readonly mailerService: MailerService,
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
   * @TODO
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

    this.mailerService.sendWelcomeMail(newUser.email!, newUser.firstName);

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

    return this.tokenHelper.generateAndSaveTokens(user, ipAddress, userAgent);
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

    return this.tokenHelper.generateAndSaveTokens(user, ipAddress, userAgent);
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
    jti: string,
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

    // 3. jti를 이용해 특정 세션 토큰 직접 조회 (최적화)
    const tokenSession = await this.prisma.refreshToken.findUnique({
      where: { jti },
    });

    // 4. 세션 존재 여부 및 만료 시간 검증
    if (!tokenSession || tokenSession.expiresAt <= new Date()) {
      throw new UnauthorizedException(
        '유효하지 않거나 이미 만료된 토큰입니다. 다시 로그인해 주세요.',
      );
    }

    // 5. Client에서 전달된 Token과 DB의 Token 해시값 1회 검증
    const isMatched = await argon2.verify(tokenSession.hashedToken, refreshToken);
    if (!isMatched) {
      throw new UnauthorizedException(
        '유효하지 않거나 이미 만료된 토큰입니다. 다시 로그인해 주세요.',
      );
    }

    // 6. 토큰 탈취 방지를 위한 기존 Refresh Token 삭제
    await this.prisma.refreshToken.delete({
      where: { id: tokenSession.id },
    });

    return this.tokenHelper.generateAndSaveTokens(user, ipAddress, userAgent);
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
  async logout(userId: string, jti: string, refreshToken: string) {
    // 1. jti를 이용해 특정 세션 직접 조회
    const tokenSession = await this.prisma.refreshToken.findUnique({
      where: { jti },
    });

    // 2. 세션 존재 여부 및 만료 시간 검증
    if (!tokenSession || tokenSession.expiresAt <= new Date()) {
      throw new UnauthorizedException(
        '이미 로그아웃되었거나 유효하지 않은 세션입니다.',
      );
    }

    // 3. 해시 검증
    const isMatched = await argon2.verify(tokenSession.hashedToken, refreshToken);
    if (!isMatched) {
      throw new UnauthorizedException(
        '이미 로그아웃되었거나 유효하지 않은 세션입니다.',
      );
    }

    // 4. 해당 기기의 세션을 DB에서 영구 삭제
    await this.prisma.refreshToken.delete({
      where: { id: tokenSession.id },
    });

    return {
      message: '로그아웃 성공',
    };
  }
}
