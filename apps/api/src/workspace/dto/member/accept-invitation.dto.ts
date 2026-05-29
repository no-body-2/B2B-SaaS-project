// apps/api/src/workspace/dto/member/accept-invitation.dto.ts

/**
 * Accept Invitation DTO
 * @description
 * - 워크스페이스 초대 수락 검증을 위한 1회용 보안 토큰 DTO
 *
 * @author  <Nobody>
 * @date 2026-05-29
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AcceptInvitationDto {
  @ApiProperty({
    description: '이메일로 전송된 1회용 보안 토큰',
    example: 'clh4132zsf...',
  })
  @IsNotEmpty({ message: '보안 토큰은 필수 입력 항목입니다.' })
  @IsString()
  invitationToken!: string;
}
