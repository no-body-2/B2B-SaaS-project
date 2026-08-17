// apps/api/src/workspace/dto/explore-workspace.dto.ts

/**
 * Explore Workspace Dto
 *
 * @description
 * - Workspace 탐색을 위한 Dto
 *
 * @author <nobody>
 * @date 2026-08-17
 */

import { IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum ExploreSortOption {
  POPULAR = 'popular',
  RECENT = 'recent',
  MEMBER_DENSITY = 'member_density',
}

export class ExploreWorkspaceDto {
  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsEnum(ExploreSortOption)
  sort?: ExploreSortOption = ExploreSortOption.POPULAR;

  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 12;
}
