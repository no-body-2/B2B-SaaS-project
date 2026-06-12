// apps/api/src/channel/dto/delegate-owner.dto.ts

/**
 * Delegate Owner DTO
 * @description
 * 채팅방 소유권을 위임하기 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-06-12
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DelegateOwnerDto {
  @ApiProperty({
    description: '방장 권한을 위임받을 대상 사용자 ID',
    example: 'u-a1234',
  })
  @IsNotEmpty({
    message: '권한을 위임받을 대상의 ID는 필수 입력 항목입니다.',
  })
  @IsString({ message: 'targetUserId는 문자열 형태여야 합니다.' })
  targetUserId!: string;
}
