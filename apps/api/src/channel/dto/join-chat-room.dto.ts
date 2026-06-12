// NOTICE: Api v1에서는 사용하지 않음

// apps/api/src/channel/dto/join-chat-room.dto.ts

/**
 * Join Chat Room DTO
 * @description
 * - 사용자가 특정 채팅방 입장 시 사용하는 DTO
 *
 * @author  <Nobody>
 * @date 2026-06-12
 */

import { IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class JoinChatRoomDto {
  @ApiPropertyOptional({
    description: '채팅방 입장 시 사용할 비밀번호',
  })
  @IsOptional()
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @Length(4, 16, { message: '비밀번호는 4~16자리여야 합니다.' })
  password?: string;
}
