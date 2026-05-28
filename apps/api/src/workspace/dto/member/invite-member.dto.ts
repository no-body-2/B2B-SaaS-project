// apps/api/src/workspace/dto/member/invite-member.dto.ts

/**
 * Invite Member DTO
 * @description
 * - 워크스페이스에 멤버 초대를 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-05-28
 */

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InviteMemberDto {
  @ApiProperty({
    description: '초대할 대상의 이메일 주소',
    example: 'sample@invite.com',
  })
  @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
  @IsEmail({}, { message: '유효한 이메일 형식이 아닙니다.' })
  email!: string;

  @ApiPropertyOptional({
    description: '초대 메시지 내용',
    example: '사회적 ㅈㅇㅎ 클럽에 초대합니다.',
  })
  @IsOptional()
  @IsString({ message: '초대 메시지는 문자열 형식이어야 합니다.' })
  @Length(0, 100, { message: '초대 메시지는 최대 100자까지 입력 가능합니다.' })
  invitation?: string;
}
