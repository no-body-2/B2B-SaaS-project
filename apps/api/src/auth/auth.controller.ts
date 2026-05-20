// apps/api/src/auth/auth.controller.ts

/**
 * Auth Controller
 *
 * @description
 * Auth Module의 기능을 이용하기 위한 진입점 제공
 *
 * @author  <Nobody>
 * @date 2026-05-15
 */

import {
  Controller,
  Post,
  Body,
  Ip,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiHeader } from '@nestjs/swagger';

// 기본 주소 '/auth'
@ApiTags('인증 (Auth)')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * AUTH-LOCAL-001
   * @description
   * - 신규 사용자의 회원가입 요청 처리
   * @url /auth/register
   * @param registerDto - Client 측에서 전송한 회원가입 Form 데이터
   * @returns DB에 생성된 사용자 정보 (password는 hash 처리 후 저장)
   */
  @Post('register')
  @ApiOperation({
    summary: 'AUTH-LOCAL-001 회원가입',
    description: '신규 사용자 등록, 비밀번호는 단방향 암호화되어 저장됨',
  })
  @ApiResponse({ status: 201, description: '회원가입 성공 (사용자 객체 반환)' })
  @ApiResponse({
    status: 400,
    description:
      '유효성 검사 실패 (필수 입력값 누락, 비밀번호 형식 불일치 등 유효성 검사 실패)',
  })
  @ApiResponse({ status: 409, description: '이미 사용 중인 이메일 (Conflict)' })
  async register(@Body() registerDto: RegisterDto) {
    // main.ts의 ValidationPipe 유효성 검사
    // registerDto의 검증 조건

    return this.authService.registerUser(registerDto);
  }

  /**
   * AUTH-LOCAL-002
   * @description
   * - 사용자 인증 및 토큰 (Access Token & Refresh Token) 발급
   * @url /auth/login
   * @param loginDto - 이메일 및 비밀번호
   * @param ip - (서버 자동 추출) 접속 Client IP
   * @param userAgent - (Header 추출) 접속 Client 브라우저 및 기기 정보
   * @returns 사용자 정보, Access Token (1h), Refresh Token (7d)
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'AUTH-LOCAL-002 Email 로그인',
    description: '이메일과 비밀번호로 인증을 수행하고 토큰을 발급',
  })
  @ApiHeader({
    name: 'user-agent',
    description: '접속한 Client 브라우저 및 기기 정보',
    required: false,
  })
  @ApiResponse({ status: 200, description: '로그인 및 토큰 발급 성공' })
  @ApiResponse({
    status: 400,
    description: '필수 입력값 누락, 비밀번호 형식 불일치 등 유효성 검사 실패',
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패 (이메일 또는 비밀번호 불일치)',
  })
  @ApiResponse({
    status: 403,
    description: '현재 탈퇴 대기 중인 상태로 인증 불가',
  })
  async login(
    @Body() loginDto: LoginDto,
    @Ip() ip?: string,
    @Headers('user-agent') userAgent?: string,
  ) {
    // loginDto 검증 조건

    return this.authService.loginUser(loginDto, ip, userAgent);
  }

  /**
   * AUTH-SOCIAL-001
   * @description
   * - Google OAuth 소셜 로그인 처리
   * @url /auth/google
   * @param googleLoginDto - Client가 Google을 통해 발급받은 인가 코드 (Authorization Code)
   * @param ip - (서버 자동 추출) 접속 Client IP
   * @param userAgent - (Header 추출) 접속 Client 브라우저 및 기기 정보
   * @returns 사용자 정보, Access Token (1h), Refresh Token (7d)
   */
  @Post('google')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'AUTH-SOCIAL-001 Google OAuth 로그인',
    description: 'Google OAuth를 통해 인증을 수행하고 토큰을 발급',
  })
  @ApiHeader({
    name: 'user-agent',
    description: '접속한 Client 브라우저 및 기기 정보',
    required: false,
  })
  @ApiResponse({ status: 200, description: '로그인 및 토큰 발급 성공' })
  @ApiResponse({
    status: 400,
    description:
      '유효하지 않은 Google 인가 코드 or Google API 서버와 통신 실패',
  })
  @ApiResponse({
    status: 403,
    description: '현재 탈퇴 대기 중인 상태로 인증 불가',
  })
  async googleLogin(
    @Body() googleLoginDto: GoogleLoginDto,
    @Ip() ip?: string,
    @Headers('user-agent') userAgent?: string,
  ) {
    return this.authService.googleLogin(googleLoginDto, ip, userAgent);
  }
}
