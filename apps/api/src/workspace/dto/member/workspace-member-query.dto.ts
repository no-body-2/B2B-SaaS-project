// apps/api/src/workspace/dto/member/workspace-member-query.dto.ts

/**
 * Workspace Member Query DTO
 * @description
 * - 워크스페이스 내의 사용자 검색을 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-05-29
 */

import { IsOptional, IsString, IsInt, Min, Max, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class WorkspaceMemberQueryDto {
  @ApiPropertyOptional({
    description: '조회할 페이지 번호 (default: 1)',
    default: 1,
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 1 : parsed;
  })
  @IsInt({ message: '페이지 번호는 정수여야 합니다.' })
  @Min(1, { message: '페이지 번호는 1 이상이어야 합니다.' })
  page: number = 1;

  @ApiPropertyOptional({
    description: '한 페이지 당 제공할 데이터 개수 (max: 80, default: 20)',
    default: 20,
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 20 : parsed;
  })
  @IsInt({ message: '데이터 개수는 정수여야 합니다.' })
  @Min(1, { message: '데이터 개수는 1 이상이어야 합니다.' })
  @Max(80, { message: '데이터 개수는 80 이하여야 합니다.' })
  size: number = 20;

  @ApiPropertyOptional({
    description: '검색 키워드',
    example: 'John',
  })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({
    description: '특정 권한 필터링',
    enum: ['OWNER', 'ADMIN', 'MEMBER'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['OWNER', 'ADMIN', 'MEMBER'], {
    message: '권한은 OWNER, ADMIN, MEMBER 중 하나여야 합니다.',
  })
  role?: string;
}
