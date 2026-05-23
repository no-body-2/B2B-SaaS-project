// apps/api/src/user/dto/update-profile.dto.ts

/**
 * Update Profile DTO
 *
 * @description
 * - 사용자 기본 정보 수정을 위한 입력 데이터 검증 객체
 * @remarks
 * - api/v1 에서는 사용자 이름 수정 기능만 제공
 *
 * @author  <Nobody>
 * @date 2026-05-23
 */

import { IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    description: '사용자 이름 (First Name)',
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  firstName?: string;

  @ApiProperty({
    description: '사용자 성 (Last Name)',
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  lastName?: string;
}
