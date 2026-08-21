// apps/api/src/workflow/dto/create-approval-request.dto.ts

/**
 * Create Approval Request DTO
 * @description
 * - 결재 요청 (Approval Request)을 생성하기 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-06-08
 */

import { IsString, IsOptional, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@luminano/database';

export class CreateApprovalRequestDto {
  @ApiPropertyOptional({
    description: '결재 요청에 대한 코멘트/설명',
    example: 'Test Nano 수정 결재 요청',
  })
  @IsOptional()
  @IsString({ message: 'comment는 문자열 형태여야 합니다.' })
  comment?: string;

  @ApiPropertyOptional({
    description: '결재 요청에 대한 설명',
    example: 'Test Nano 수정 결재 요청',
  })
  @IsOptional()
  @IsString({ message: 'description은 문자열 형태여야 합니다.' })
  description?: string;

  @ApiPropertyOptional({
    description: '대상 Nano 문서 식별자 (CUID 등)',
    example: 'clx0123456789abcdef01234',
  })
  @IsOptional()
  @IsString({ message: 'nanoId는 문자열 형태여야 합니다.' })
  nanoId?: string;

  @ApiPropertyOptional({
    description: '수정된 Nano 제목',
    example: 'Updated Test Nano Title',
  })
  @IsOptional()
  @IsString({ message: 'title은 문자열 형태여야 합니다.' })
  title?: string;

  @ApiPropertyOptional({
    description: '수정된 Nano Content',
    example: 'Updated Test Nano Content',
  })
  @IsOptional()
  @IsObject({ message: 'content는 유효한 JSON 객체 형식이어야 합니다.' })
  content?: Prisma.InputJsonObject;
}
