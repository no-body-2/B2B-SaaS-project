// apps/api/src/workflow/workflow.service.ts

/**
 * Nano Workflow Service
 *
 * @description
 * Nano 모듈의 Workflow Service
 *
 * @author  <Nobody>
 * @date 2026-06-06
 */

import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkspaceGuardService } from '../common/guard/workspace-guard.service';
import { TargetNanoParamDto } from '../common/dto/target-nano-param.dto';
import { CreateApprovalRequestDto } from './dto/create-approval-request.dto';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class WorkflowService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceGuard: WorkspaceGuardService,
  ) {}

  /**
   * NANO-WORKFLOW-001
   * @description
   * - Nano 수정에 관한 결재 요청 생성
   * @param userId - 요청 사용자 ID
   * @param param - 해당 Nano 정보가 담긴 객체
   * @param dto - 결재 요청 생성 정보가 담긴 DTO 객체
   * @returns 생성된 결재 요청 ID 및 성공 메시지
   * @throws
   * - {BadRequestException} - 잘못된 요청 데이터
   * - {NotFoundException} - Nano를 찾을 수 없음
   */
  async createApprovalRequest(
    userId: string,
    param: TargetNanoParamDto,
    dto: CreateApprovalRequestDto,
  ) {
    const { workspaceId, nanoId } = param;
    const { comment, title, content } = dto;

    // 1. 사용자 권한 검증
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // 2. Nano 존재 및 소속 여부 및 삭제 여부 확인
    const targetNano = await this.prisma.nano.findUnique({
      where: { id: nanoId },
    });

    if (!targetNano || targetNano.deletedAt !== null) {
      throw new NotFoundException('해당하는 Nano를 찾을 수 없습니다.');
    }

    if (targetNano.workspaceId !== workspaceId) {
      throw new BadRequestException('해당 Nano에 접근할 수 없습니다.');
    }

    // 3. 진행 중인 결재 요청이 있는지 확인
    const isAlreadyPending = await this.prisma.pendingNano.findFirst({
      where: { nanoId },
    });

    if (isAlreadyPending) {
      throw new BadRequestException('이미 진행 중인 결재 요청이 있습니다.');
    }

    // 4. 결재 요청 생성 (트랜잭션으로 관리하여 모든 작업이 성공적으로 완료되어야 함)
    return this.prisma.$transaction(async (tx) => {
      const historyId = `h-${createId()}`;
      const approvalRequestId = `a-${createId()}`;

      // TODO: History Table에 수정자의 Id 추가로 수정 요청을 보낸 사용자의 정보를 포함할 지 결정 후 수정할 것
      // 4-1. History 생성
      const newHistory = await tx.nanoHistory.create({
        data: {
          id: historyId,
          nanoId,
          title: title ?? targetNano.title ?? '',
          content: content ? content : (targetNano.content ?? undefined),
          writerId: targetNano.writerId,
          workspaceId,
          version: `v-${Date.now()}`,
        },
      });

      // 4-2. 결재 요청 생성
      const newApprovalRequest = await tx.approvalRequest.create({
        data: {
          id: approvalRequestId,
          nanoId,
          historyId: newHistory.id,
          status: 'PENDING',
        },
      });

      // 4-3. Pending Nano 테이블에 정보 추가
      await tx.pendingNano.create({
        data: {
          approvalId: newApprovalRequest.id,
          nanoId,
          comment,
        },
      });

      return {
        message: '결재 요청이 생성되었습니다.',
        approvalRequestId: newApprovalRequest.id,
        nanoId,
        status: 'PENDING',
        updatedAt: new Date(),
      };
    });
  }
}
