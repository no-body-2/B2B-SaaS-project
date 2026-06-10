// apps/api/src/workflow/dto/decide-approval-request.dto.ts

/**
 * Decide Approval Request DTO
 * @description
 * - 결재 요청의 승인 혹은 반려 처리를 위한 DTO
 *
 * @author  <Nobody>
 * @date 2026-06-08
 */

import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ApprovalDecideStatus {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}

export class DecideApprovalRequestDto {
  @ApiProperty({
    description: '결재 승인 상태 (APPROVE: 승인 / REJECT: 반려)',
    enum: ApprovalDecideStatus,
    example: ApprovalDecideStatus.APPROVE,
  })
  @IsNotEmpty({ message: '결재 승인 상태는 필수 입력 항목입니다.' })
  @IsEnum(ApprovalDecideStatus, {
    message: '유효하지 않은 결재 승인 상태입니다.',
  })
  status!: ApprovalDecideStatus;

  @ApiProperty({
    description: '결재 이후 처리 결과 메시지',
    example: '사유가 명확하니 승인합니다.',
  })
  @IsNotEmpty({ message: '결재 처리 결과 메시지는 필수 입력 항목입니다.' })
  @IsString()
  comment!: string;
}
