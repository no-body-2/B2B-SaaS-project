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

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

// 기본 주소 '/auth'
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
  async register(@Body() registerDto: RegisterDto) {
    // main.ts의 ValidationPipe 유효성 검사
    // registerDto의 검증 조건

    return this.authService.registerUser(registerDto);
  }
}
