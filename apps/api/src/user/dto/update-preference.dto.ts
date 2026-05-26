// apps/api/src/user/dto/update-preference.dto.ts

/**
 * Update User Preference DTO
 * @description
 * - 사용자 환경 설정 수정을 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-05-26
 */

import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserPreferenceDto {
  @ApiPropertyOptional({
    description: '화면 테마 설정',
    enum: ['light', 'dark', 'system'],
    example: 'dark',
  })
  @IsOptional()
  @IsIn(['light', 'dark', 'system'], {
    message: '테마는 light, dark, system 중 하나여야 합니다.',
  })
  theme?: string;

  @ApiPropertyOptional({
    description: '사용 언어 설정 (ISO-639-1)',
    example: 'ko',
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({
    description: '시간대 설정 (IANA Time Zone)',
    example: 'Asia/Seoul',
  })
  @IsOptional()
  @IsString()
  timezone?: string;
}
