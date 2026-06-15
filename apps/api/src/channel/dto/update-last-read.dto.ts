// apps/api/src/channel/dto/update-last-read.dto.ts

/**
 * Update Last Read DTO
 * @description 사용자가 채팅방 내에서 마지막으로 확인한 메시지 식별자를 마킹 및 갱신할 때 사용하는 바디 검증 객체
 * @author <Nobody>
 * @date 2026-06-15
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLastReadDto {
  @ApiProperty({
    description:
      '해당 채팅방에서 사용자가 가장 최근에 확인한 마지막 메시지 ID (CUID 등)',
    example: 'msg-cuid-9999',
  })
  @IsNotEmpty({
    message:
      '마지막으로 읽은 메시지 식별 정보(lastReadMessageId)는 필수 입력 사항입니다.',
  })
  @IsString({ message: 'lastReadMessageId는 문자열 형태여야 합니다.' })
  lastReadMessageId!: string;
}
