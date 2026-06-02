// apps/api/src/nano/dto/move-nano.dto.ts

/**
 * Move Nano DTO
 * @description
 * - Nano의 Frontend UI 내의 위치 이동 로직을 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-06-02
 */

import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class MoveNanoDto {
  @ApiPropertyOptional({
    description: '새롭게 지정될 parentNanoId',
    example: 'n-1234asd...',
  })
  @IsOptional()
  @IsString()
  targetParentNanoId?: string;

  @ApiPropertyOptional({
    description: '이동할 위치 바로 직전의 nanoId (최상단일 경우 null)',
    example: 'n-0000asd...',
  })
  @IsOptional()
  @IsString()
  prevNanoId?: string;
}
