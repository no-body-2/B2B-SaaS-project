// apps/api/src/workspace/dto/update-workspace.dto.ts

/**
 * Update Workspace DTO
 * @description
 * - 워크스페이스 정보 부분 수정 DTO
 *
 * @author  <Nobody>
 * @date 2026-05-27
 */

import { IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWorkspaceDto {
  @ApiPropertyOptional({ description: '변경할 워크스페이스 이름' })
  @IsOptional()
  @IsString()
  @Length(2, 32, {
    message: '워크스페이스 이름은 최소 2자에서 최대 32자 이내로 작성해주세요.',
  })
  name?: string;

  @ApiPropertyOptional({ description: '변경할 워크스페이스 소개글' })
  @IsOptional()
  @IsString()
  @Length(0, 100, {
    message: '워크스페이스 소개글은 최대 100자 이내로 작성해주세요.',
  })
  description?: string;

  @ApiPropertyOptional({ description: '변경할 워크스페이스 프로필 이미지 URL' })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: '프로필 이미지 URL은 유효한 URL 형식이어야 합니다.' })
  logoUrl?: string;
}
