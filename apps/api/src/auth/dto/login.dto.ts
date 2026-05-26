// apps/api/src/auth/dto/login.dto.ts

/**
 * Auth - Login Dto
 *
 * @description
 * Auth 모듈의 로그인에 사용할 Dto
 *
 * @author  <Nobody>
 * @date 2026-05-18
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '사용자 이메일', example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: '사용자 비밀번호',
    example: 'SecureP@ssw0rd321!',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password!: string;
}
