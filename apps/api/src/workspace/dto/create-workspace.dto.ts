// apps/api/src/workspace/dto/create-workspace.dto.ts

/**
 * Create Workspace DTO
 * @description
 * - 워크스페이스 생성을 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-05-26
 */

import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWorkspaceDto {
  @ApiProperty({
    description: '워크스페이스 이름',
    example: 'My Workspace',
  })
  @IsNotEmpty({
    message: '워크스페이스 이름은 필수 입력 항목입니다.',
  })
  @IsString()
  @Length(2, 32, { message: '워크스페이스 이름은 2~32자 사이여야 합니다.' })
  name!: string;

  @ApiPropertyOptional({
    description: '워크스페이스 소개글',
    example: '테스트용 워크스페이스입니다. 👺',
  })
  @IsOptional()
  @IsString()
  @Length(0, 100, { message: '워크스페이스 설명은 255자 이하여야 합니다.' })
  description?: string;

  @ApiPropertyOptional({
    description: '워크스페이스 로고 이미지 URL',
    example: 'https://example.com/logo.png',
  })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: '유효한 URL 형식이어야 합니다.' })
  logoUrl?: string;
}
