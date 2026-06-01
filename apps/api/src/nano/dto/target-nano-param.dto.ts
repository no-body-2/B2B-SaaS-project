// apps/api/src/nano/dto/target-nano-param.dto.ts

/**
 * Target Nano Param DTO
 * @description
 * - 단건 Nano 상세 조회 파라미터 DTO
 *
 * @author  <Nobody>
 * @date 2026-06-01
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TargetNanoParamDto {
  @ApiProperty({
    description: 'Workspace 고유 식별자 (CUID)',
    example: 'w-1234qwe...',
  })
  @IsNotEmpty({ message: 'Workspace ID는 필수 입력 항목입니다.' })
  @IsString()
  workspaceId!: string;

  @ApiProperty({
    description: '조작 및 조회 대상 Nano 고유 식별자 (CUID)',
    example: 'n-1234qwe...',
  })
  @IsNotEmpty({ message: 'Nano ID는 필수 입력 항목입니다.' })
  @IsString()
  nanoId!: string;
}
