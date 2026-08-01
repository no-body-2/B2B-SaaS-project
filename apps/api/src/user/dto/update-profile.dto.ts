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

  @ApiProperty({
    description: '사용자 닉네임',
    example: 'lumi_master',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  nickname?: string;

  @ApiProperty({
    description: '프로필 이미지 URL',
    example: 'https://example.com/avatar.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiProperty({
    description: '기본 이름 표시 방식 (NICKNAME 또는 REAL_NAME)',
    example: 'NICKNAME',
    required: false,
  })
  @IsOptional()
  @IsString()
  defaultNameDisplay?: string;
}
