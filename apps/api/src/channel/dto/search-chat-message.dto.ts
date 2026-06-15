// apps/api/src/channel/dto/search-chat-message.dto.ts

/**
 * Search Chat Message DTO
 * @description 채팅방 내부에서 특정 텍스트 키워드를 검색할 때 사용하는 쿼리 스트링 검증 객체
 *
 * @author <Nobody>
 * @date 2026-06-15
 */

import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SearchChatMessageDto {
  @ApiProperty({
    description: '검색할 텍스트 키워드 (최소 2자, 최대 32자)',
    example: '배포',
  })
  @IsNotEmpty({ message: '검색 키워드(keyword)는 필수 입력 사항입니다.' })
  @IsString({ message: 'keyword는 문자열 형태여야 합니다.' })
  @Length(2, 32, {
    message: '검색 키워드는 최소 2자에서 최대 32자 이하로 입력해 주세요.',
  })
  keyword!: string;

  @ApiPropertyOptional({
    description: '페이징 기준점이 되는 메시지 ID',
    example: 'msg-cuid-5555',
  })
  @IsOptional()
  @IsString({ message: 'cursor 값은 문자열 형태여야 합니다.' })
  cursor?: string;

  @ApiPropertyOptional({
    description: '한 번에 불러올 검색 결과 개수 (최소 1개, 최대 100개)',
    default: 32,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit 값은 정수형 숫자여야 합니다.' })
  @Min(1, { message: 'limit은 최소 1개 이상이어야 합니다.' })
  @Max(100, { message: 'limit은 최대 100개를 초과할 수 없습니다.' })
  limit?: number = 32;
}
