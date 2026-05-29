// apps/api/src/workspace/dto/member/target-member.dto.ts

/**
 * Target Member DTO
 * @description
 * - 워크스페이스의 사용자 중 한 명을 색출하기 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-05-29
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TargetMemberDto {
  @ApiProperty({ description: '조회 대상 워크스페이스 ID' })
  @IsNotEmpty({ message: '워크스페이스 ID는 필수입니다.' })
  @IsString()
  workspaceId!: string;

  @ApiProperty({ description: '조회 대상 사용자 ID' })
  @IsNotEmpty({ message: '사용자 ID는 필수입니다.' })
  @IsString()
  targetUserId!: string;
}
