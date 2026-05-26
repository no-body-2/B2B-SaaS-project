// apps/api/src/workspace/dto/create-workspace.dto.ts

/**
 * Create Workspace DTO
 * @description
 * - 워크스페이스 생성을 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-05-26
 */

import { IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWorkspaceDto {
  @ApiProperty({
    description: '워크스페이스 이름',
    example: 'My Workspace',
  })
}