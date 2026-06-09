// apps/api/src/workflow/dto/get-approval-request-list.dto.ts

/**
 * Get Approval Request List DTO
 * @description
 * - Approval Request List 조회를 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-06-09
 */

import { IsOptional, IsInt, Min, IsEnum, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum ApprovalStatus {
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
  ALL = 'ALL',
}

export class GetApprovalRequestListDto {
  @ApiPropertyOptional({
    description: '요청할 페이지 번호',
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: '페이지 번호는 1 이상이어야 합니다.' })
  page?: number = 1;

  @ApiPropertyOptional({
    description: '한 페이지 당 표시할 데이터 수',
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: '한 페이지 당 표시할 데이터 수는 1 이상이어야 합니다.' })
  @Max(100, { message: '한 페이지 당 표시할 데이터 수는 100 이하여야 합니다.' })
  limit?: number = 20;

  @ApiPropertyOptional({
    description: '검색 시 필터링할 결재 상태 (기본값: PENDING)',
    enum: ApprovalStatus,
    default: ApprovalStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(ApprovalStatus, {
    message: '결재 상태는 PENDING, APPROVED, REJECTED, ALL 중 하나여야 합니다.',
  })
  status?: ApprovalStatus = ApprovalStatus.PENDING;

  @ApiPropertyOptional({
    description: '검색 시 사용할 키워드',
  })
  @IsOptional()
  @IsString({ message: '키워드는 문자열이어야 합니다.' })
  keyword?: string;
}
