// apps/api/src/user/dto/change-password.dto.ts

/**
 * Change Password DTO
 * @description
 * - 기존 비밀번호 검증 및 신규 비밀번호 형식 검증 후 변경
 * @remarks
 * - 최소 8자, 최대 20자의 제약 조건을 가짐
 * - 비밀번호는 영문, 숫자, 특수문자의 조합으로 이루어져야 함
 *
 * @author  <Nobody>
 * @date 2026-05-24
 */

import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ description: '기존 비밀번호', example: 'SecureP@ssw0rd321!' })
  @IsNotEmpty({ message: '기존 비밀번호는 필수 입력 항목입니다.' })
  @IsString()
  currentPassword!: string;

  @ApiProperty({ description: '신규 비밀번호', example: 'NewSecureP@ssw0rd!' })
  @IsNotEmpty({ message: '신규 비밀번호는 필수 입력 항목입니다.' })
  @IsString()
  @Length(8, 20, { message: '8~20자 사이의 비밀번호를 입력하십시오.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, {
    message: '비밀번호는 영문, 숫자, 특수문자를 최소 하나씩 포함해야 합니다.',
  })
  newPassword!: string;
}
