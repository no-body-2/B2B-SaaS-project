// apps/api/src/inquiry/dto/create-inquiry.dto.ts

import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInquiryDto {
  @ApiProperty({ description: '문의 제목' })
  @IsString()
  @IsNotEmpty({ message: '문의 제목을 입력해주세요.' })
  title!: string;

  @ApiProperty({ description: '문의 본문 내용' })
  @IsString()
  @IsNotEmpty({ message: '문의 내용을 입력해주세요.' })
  content!: string;

  @ApiPropertyOptional({ description: '비공개 글여부', default: false })
  @IsOptional()
  @IsBoolean()
  isSecret?: boolean;
}
