// apps/api/src/inquiry/dto/answer-inquiry.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnswerInquiryDto {
  @ApiProperty({ description: 'SUPER_ADMIN 관리자 답변 내용' })
  @IsString()
  @IsNotEmpty({ message: '답변 내용을 입력해주세요.' })
  answer!: string;
}
