// apps/api/src/user/dto/verify-email-change.dto.ts

/**
 * Verify Email Change DTO
 * @description
 * - 이메일 변경 승인을 위한 URL Query Parameter 객체
 *
 * @author  <Nobody>
 * @date 2026-05-26
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailChangeDto {
  @ApiProperty({
    description: '사용자 이메일 변경을 위한 인증 토큰',
    example: 'eyJhbGciOiJIUzI1NiIsInR5c...',
  })
  @IsNotEmpty()
  @IsString()
  token!: string;
}
