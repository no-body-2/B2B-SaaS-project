// apps/api/src/auth/dto/google-login.dto.ts

/**
 * Auth - Google Login Dto
 *
 * @description
 * Auth 모듈의 Google 로그인에 사용할 Dto
 *
 * @author  <Nobody>
 * @date 2026-05-20
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleLoginDto {
  @ApiProperty({
    description:
      '프런트엔드에서 발급받은 Google 인가 코드 (Google Authorization Code)',
    example: '4/0A2asdgE2a...',
  })
  @IsString()
  @IsNotEmpty({ message: 'Google 인가 코드는 필수 항목입니다.' })
  code!: string;
}
