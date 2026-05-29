// apps/api/src/workspace/dto/member/update-role.dto.ts

/**
 * Update Member Role DTO
 * @description
 * - 워크스페이스의 OWNER 권한의 사용자가 다른 멤버의 권한을 제어 시 사용하는 DTO
 *
 * @author  <Nobody>
 * @date 2026-05-29
 */

import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMemberRoleDto {
  @ApiProperty({ description: '새로 부여할 권한 등급 (ADMIN OR MEMBER)' })
  @IsNotEmpty({ message: '변경할 권한 등급은 필수 항목입니다.' })
  @IsString()
  @IsIn(['ADMIN', 'MEMBER'], {
    message: 'ADMIN 또는 MEMBER 권한만 변경 가능합니다.',
  })
  newRole!: string;
}
