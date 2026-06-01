// apps/api/src/nano/dto/update-nano.dto.ts

/**
 * Update Nano DTO
 * @description
 * - Nano 업데이트를 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-06-01
 */

import { IsNotEmpty, IsString, IsObject, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNanoDto {
  @ApiPropertyOptional({
    description: '수정할 Nano의 제목',
    example: 'Updated Nano Title',
  })
  @ValidateIf((o: UpdateNanoDto) => !o.content || o.title !== undefined)
  @IsNotEmpty({
    message: 'Title과 Content 둘 중 하나는 유효한 데이터가 입력되어야 합니다.',
  })
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: '수정할 Nano의 내용',
    example: { markdown: 'Updated Nano Content' },
  })
  @ValidateIf((o: UpdateNanoDto) => !o.title || o.content !== undefined)
  @IsNotEmpty({
    message: 'Title과 Content 둘 중 하나는 유효한 데이터가 입력되어야 합니다.',
  })
  @IsObject({ message: 'Content는 유효한 JSON 객체 형식이어야 합니다.' })
  content?: Record<string, any>;
}
