// apps/api/src/nano/dto/create-nano.dto.ts

/**
 * Create Nano DTO
 * @description
 * - Tree 구조를 가질 수 있는 B2B 서비스의 메인 부분인 Nano를 생성하는 DTO
 *
 * @author  <Nobody>
 * @date 2026-05-30
 */

import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsObject,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNanoDto {
  @ApiPropertyOptional({
    description: 'Parent Nano의 고유 식별자 (ID)',
    example: 'nano-1234567890',
  })
  @IsOptional()
  @IsString()
  parentNanoId?: string;

  @ApiProperty({ description: 'Nano의 유형 (EX: PAGE, TEXT...)' })
  @IsNotEmpty({ message: 'Nano의 타입은 필수 항목입니다.' })
  @IsString()
  type!: string;

  @ApiPropertyOptional({ description: 'Nano의 이름', example: 'My Nano 000' })
  @ValidateIf((o: CreateNanoDto) => !o.content || o.title !== undefined)
  @IsNotEmpty({ message: 'title과 content 둘 중 하나는 필수 항목입니다.' })
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Nano가 담고 있는 Content 내용',
    example: { blockStyle: 'default', markdown: '## Hello, Nano!' },
  })
  @ValidateIf((o: CreateNanoDto) => !o.title || o.content !== undefined)
  @IsNotEmpty({ message: 'title과 content 둘 중 하나는 필수 항목입니다.' })
  @IsObject({ message: 'content는 JSON 객체 형태여야 합니다.' })
  content?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Drag & Drop으로 UI를 구성하는 Nano의 순서',
    example: 'clh41324...',
  })
  @IsOptional()
  @IsString()
  prevNanoId?: string;
}
