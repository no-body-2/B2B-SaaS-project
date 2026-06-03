// apps/api/src/workspace/dto/workspace-param.dto.ts

/**
 * Workspace Param DTO
 * @description
 * - URL 경로로 전달할 워크스페이스 CUID 식별자 유효성 검증 객체
 *
 * @author  <Nobody>
 * @date 2026-05-27
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WorkspaceParamDto {
  @ApiProperty({
    description: '워크스페이스 ID',
    example: 'w-10zasdf213xdf0...',
  })
  @IsNotEmpty({ message: '워크스페이스 ID는 필수 파라미터입니다.' })
  @IsString()
  workspaceId!: string;
}
