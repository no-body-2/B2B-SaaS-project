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
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2'; // bcrypt 대신 보안성이 더 훌륭한 (CPU 연산 뿐 아니라 RAM마저 소모해야함) argon2 사용
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 신규 사용자 생성 및 비밀번호를 해싱하여 DB에 저장
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
   * 사용자 인증 (로그인) 및 서비스 접근을 위한 JWT Access Token 발급
   * @remarks
   * - 보안을 위해 이메일 존재 여부, 비밀번호 일치 여부와 상관없이 UnauthorizedException 발생
   * @param dto - Client 측에서 검증을 마친 로그인 데이터
   * @returns 사용자 정보 (password 제외) & JWT Access Token이 담긴 객체
   * @throws
   * - {UnauthorizedException} - 이메일 또는 비밀번호가 올바르지 않은 경우
   * - {ForbiddenException} - 현재 탈퇴 대기 중인 계정인 경우
   */
  async loginUser(dto: LoginDto) {
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

    if (user.deletedAt !== null) {
      throw new ForbiddenException('현재 탈퇴 대기 중인 계정입니다.');
    }

    // 2. Argon2로 비밀번호 검증
    const isPasswordValid = await argon2.verify(user.password, dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    // 3. 검증 성공 시 JWT 토큰 발급
    // Payload에 비밀번호등의 민감한 정보를 제외한 최소한의 식별자 반환
    const payload = { sub: user.id, email: user.email };

    // Access Token 생성
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '1h',
    });

    // Refresh Token 생성
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    // 4. Token & User 정보 반환
    const { password: _, ...userInfo } = user;
    return {
      user: userInfo,
      accessToken,
      refreshToken,
    };
  }
}
