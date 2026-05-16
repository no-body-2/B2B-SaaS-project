// apps/api/src/auth/dto/register.dto.ts

/**
 * Auth - Register Dto
 *
 * @description
 * Auth 모듈의 회원가입 로직에 사용할 Dto
 *
 * @author  <Nobody>
 * @date 2026-05-15
 */

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  // 1. 이메일 검증: 필수 입력 항목, 올바른 이메일 형식
  @ApiProperty({
    description: '사용자의 이메일 주소',
    example: 'user@example.com',
  })
  @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
  @IsEmail({}, { message: '올바른 이메일 형식을 입력하십시오.' })
  email!: string;

  // 2. 비밀번호 검증: 필수 입력 항목, 문자열, 최소 8자 이상, 최대 20자 이하
  @ApiProperty({
    description: '사용자의 비밀번호',
    example: 'SecureP@ssw0rd321!',
  })
  @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @MaxLength(20, { message: '비밀번호는 최대 20자 이하이어야 합니다.' })
  password!: string;

  // 3. 이름 (Firstname) 검증: 필수 입력 항목, 문자열
  @ApiProperty({
    description: '사용자의 이름 (First Name)',
    example: 'John',
  })
  @IsNotEmpty({ message: '이름은 필수 입력 항목입니다.' })
  @IsString()
  firstName!: string;

  // 4. 이름 (Lastname) 검증: 문자열
  @ApiProperty({
    description: '사용자의 성 (Last Name)',
    example: 'Doe',
    required: false,
  })
  @IsString()
  lastName?: string;
}
