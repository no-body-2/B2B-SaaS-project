// apps/api/src/workflow/dto/create-approval-request.dto.ts

/**
 * Create Approval Request DTO
 * @description
 * - 결재 요청 (Approval Request)을 생성하기 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-06-08
 */

import { IsNotEmpty, IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApprovalRequestDto {
  @ApiProperty({
    description: '결재 요청에 대한 설명',
    example: 'Test Nano 수정 결재 요청',
  })
  @IsNotEmpty({ message: '결재 요청 설명은 필수입니다.' })
  @IsString()
  comment!: string;

  @ApiPropertyOptional({
    description: '수정된 Nano Title',
    example: 'Updated Test Nano Title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: '수정된 Nano Content',
    example: 'Updated Test Nano Content',
  })
  @IsOptional()
  @IsObject({ message: 'content는 유효한 JSON 객체 형식이어야 합니다.' })
  content?: Record<string, any>;
}
