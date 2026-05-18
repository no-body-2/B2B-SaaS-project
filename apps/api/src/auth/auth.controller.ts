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

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// 기본 주소 '/auth'
@ApiTags('인증 (Auth)')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 신규 사용자의 회원가입 요청 처리
   * @url /auth/register
   * @param registerDto
   * @returns DB에 생성된 사용자 정보 (password는 hash 처리 후 저장)
   */
  @Post('register')
  @ApiOperation({ summary: '회원가입', description: '신규 사용자 등록' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({
    status: 400,
    description: '필수 입력값 누락, 비밀번호 형식 불일치 등 유효성 검사 실패',
  })
  @ApiResponse({ status: 409, description: '이미 존재하는 이메일' })
  async register(@Body() registerDto: RegisterDto) {
    // main.ts의 ValidationPipe 유효성 검사
    // registerDto의 검증 조건

    return this.authService.registerUser(registerDto);
  }

  /**
   *
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '로그인 (Local)',
    description: '이메일과 비밀번호로 인증을 수행하고 토큰을 발급',
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
  async login(@Body() loginDto: LoginDto) {
    // loginDto 검증 조건

    return this.authService.loginUser(loginDto);
  }
}
