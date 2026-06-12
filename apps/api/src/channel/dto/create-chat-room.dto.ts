// apps/api/src/channel/dto/create-chat-room.dto.ts

/**
 * Create Chat Room DTO
 * @description
 * - 채팅방 생성을 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-06-11
 */

import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateChatRoomDto {
  @ApiProperty({
    description: '채팅방 이름 (최소 2자, 최대 32자)',
    example: 'Test ChatRoom',
  })
  @IsNotEmpty({
    message: '채팅방 이름은 필수 입력 항목입니다.',
  })
  @IsString()
  @Length(2, 32, {
    message: '채팅방 이름은 최소 2자, 최대 32자 이하로 설정해야합니다.',
  })
  title!: string;

  @ApiPropertyOptional({
    description: '채팅방 상세 설명 (최대 64자)',
    example: '테스트용 채팅방입니다.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(64, {
    message: '채팅방 상세 설명은 최대 64자 이하로 설정해야합니다.',
  })
  description?: string;

  @ApiPropertyOptional({
    description: '채팅방 비공개 여부 (true: 공개, false: 비공개)',
    example: false,
  })
  @IsOptional()
  @IsBoolean({
    message: '채팅방 비공개 여부의 값은 불리언(Boolean)이어야 합니다.',
  })
  isPrivate?: boolean = false;
}
