// apps/api/src/channel/dto/send-message.dto.ts

/**
 * Send Message DTO
 * @description 특정 채팅방 내에 새로운 메시지를 전송 및 적재할 때 사용하는 DTO
 *
 * @author <Nobody>
 * @date 2026-06-15
 */

import { IsNotEmpty, IsString, IsEnum, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum MessageType {
  TEXT = 'TEXT',
  FILE = 'FILE',
}

export class SendMessageDto {
  @ApiProperty({
    description: '메시지 종류 (TEXT 또는 FILE)',
    enum: MessageType,
    example: MessageType.TEXT,
  })
  @IsNotEmpty({ message: '메시지 타입(messageType)은 필수 입력 사항입니다.' })
  @IsEnum(MessageType, {
    message: 'messageType은 TEXT 또는 FILE 중 하나여야 합니다.',
  })
  type!: MessageType;

  @ApiProperty({
    description: '메시지 본문 내용 또는 파일 주소 (최소 1자, 최대 512자)',
    example: 'Test Message 001',
  })
  @IsNotEmpty({ message: '메시지 본문 내용(content)은 필수 입력 사항입니다.' })
  @IsString({ message: 'content는 문자열 형태여야 합니다.' })
  @Length(1, 512, {
    message: '메시지 내용은 최소 1자에서 최대 512자 이하로 작성해야 합니다.',
  })
  content!: string;
}
