// apps/api/src/workspace/dto/delete-workspace.dto.ts

/**
 * Delete Workspace DTO
 * @description
 * - 워크스페이스 삭제 시 검증을 위한 이름 재확인 DTO
 *
 * @author  <Nobody>
 * @date 2026-05-27
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteWorkspaceDto {
  @ApiProperty({ description: '삭제 시 재확인을 위한 워크스페이스 이름' })
  @IsNotEmpty({ message: '워크스페이스 이름은 필수 입력 항목입니다.' })
  @IsString()
  confirmName!: string;
}
