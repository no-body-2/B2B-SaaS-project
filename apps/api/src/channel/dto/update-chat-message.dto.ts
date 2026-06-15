// apps/api/src/channel/dto/update-chat-message.dto.ts

/**
 * Update Chat Message DTO
 * @description 채팅방 내 본인이 작성한 메시지를 수정할 때 사용하는 DTO
 * @author <Nobody>
 * @date 2026-06-15
 */

import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChatMessageDto {
  @ApiProperty({
    description: '수정할 메시지 본문 내용 (최소 1자, 최대 512자)',
    example: '오늘 배포 세션 4시가 아니라 5시 시작이네요!',
  })
  @IsNotEmpty({
    message: '수정할 메시지 내용(content)은 필수 입력 사항입니다.',
  })
  @IsString({ message: 'content는 문자열 형태여야 합니다.' })
  @Length(1, 512, {
    message: '수정할 내용은 최소 1자에서 최대 512자 이하로 작성해야 합니다.',
  })
  content!: string;
}
