// apps/api/src/auth/dto/github-login.dto.ts

/**
 * GitHub Login Dto
 *
 * @description
 * - Dto for GitHub OAuth Login
 *
 * @author <nobody>
 * @date 2026-08-11
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GitHubLoginDto {
  @ApiProperty({
    description: 'GitHub OAuth 서버에서 전달 받은 Authorization Code',
    example: 'gho_12351b......',
  })
  @IsNotEmpty({ message: 'GitHub 인가 코드는 필수 입력 항목입니다.' })
  @IsString({ message: 'GitHub 인가 코드는 문자열 형태여야 합니다.' })
  code: string;

  @ApiProperty({
    description: 'Frontend에서 인증에 사용하는 Redirect URI',
    example: 'https://www.luminano.xyz/auth/github/callback',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Redirect URI는 문자열 형태여야 합니다.' })
  redirectUri?: string;
}
