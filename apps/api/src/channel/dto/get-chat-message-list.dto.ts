// apps/api/src/channel/dto/get-chat-message-list.dto.ts

/**
 * Get Chat Message List DTO
 * @description 채팅방 내 과거 메시지 내역을 커서 기반으로 페이징 하는 DTO
 *
 * @author <Nobody>
 * @date 2026-06-15
 */

import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetChatMessageListDto {
  @ApiPropertyOptional({
    description:
      '페이징 기준점이 되는 마지막 메시지 ID (최초 조회 시에는 빈 값)',
    example: 'msg-cuid-1234',
  })
  @IsOptional()
  @IsString({ message: 'cursor 값은 문자열 형태여야 합니다.' })
  cursor?: string;

  @ApiPropertyOptional({
    description: '한 번에 불러올 메시지 개수 (최소 1개, 최대 100개)',
    default: 64,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit 값은 정수형 숫자여야 합니다.' })
  @Min(1, { message: 'limit은 최소 1개 이상이어야 합니다.' })
  @Max(100, { message: 'limit은 최대 100개를 초과할 수 없습니다.' })
  limit?: number = 64;
}
