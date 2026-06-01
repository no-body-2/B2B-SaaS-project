// apps/api/src/nano/dto/nano-child-param.dto.ts

/**
 * Nano Child Param DTO
 * @description
 * - 워크스페이스 식별자 및 하위 트리를 전개할 대상 부모 Nano DTO
 *
 * @author  <Nobody>
 * @date 2026-06-01
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NanoChildParamDto {
  @ApiProperty({
    description: '워크스페이스 식별자 (CUID)',
    example: 'w-10zasdf213xdf0...',
  })
  @IsNotEmpty({ message: '워크스페이스 ID는 필수 입력 항목입니다.' })
  @IsString()
  workspaceId!: string;

  @ApiProperty({
    description: '하위 조회 기준 대상 부모 Nano 식별자 (CUID)',
    example: 'n-10zasdf213xdf0...',
  })
  @IsNotEmpty({ message: '부모 Nano ID는 필수 입력 항목입니다.' })
  @IsString()
  parentNanoId!: string;
}
