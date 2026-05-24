// apps/api/src/user/dto/request-email-change.dto.ts

/**
 * Request Email Change DTO
 * @description
 * - 사용자 이메일 변경 요청 링크 발송을 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-05-24
 */

import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestEmailChangeDto {
  @ApiProperty({
    description: '새로 변경하려는 이메일 주소',
    example: 'newmail@example.com',
  })
  @IsNotEmpty({ message: '변경하려는 이메일 주소를 입력해주세요.' })
  @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요.' })
  newEmail!: string;
}
