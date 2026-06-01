// apps/api/src/nano/dto/nano-query.dto.ts

/**
 * Nano Query DTO
 * @description
 * - 최상위 Nano 목록 조회를 위한 페이징 파라미터 DTO
 *
 * @author  <Nobody>
 * @date 2026-06-01
 */

import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class NanoQueryDto {
  @ApiPropertyOptional({
    description: '조회할 페이지 번호 (default: 1)',
    default: 1,
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    const parsed = parseInt(String(value), 10);
    return isNaN(parsed) ? 1 : parsed;
  })
  @IsInt({ message: '페이지 번호는 정수여야 합니다.' })
  @Min(1, { message: '페이지 번호는 1 이상이어야 합니다.' })
  page: number = 1;

  @ApiPropertyOptional({
    description: '조회할 페이지당 데이터 개수 (max: 80, default: 20)',
    default: 20,
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    const parsed = parseInt(String(value), 10);
    return isNaN(parsed) ? 20 : parsed;
  })
  @IsInt({ message: '페이지당 데이터 개수는 정수여야 합니다.' })
  @Min(1, { message: '페이지당 데이터 개수는 1 이상이어야 합니다.' })
  @Max(80, { message: '페이지당 데이터 개수는 80 이하여야 합니다.' })
  size: number = 20;
}
