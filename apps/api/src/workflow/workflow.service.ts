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
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkspaceGuardService } from '../common/guard/workspace-guard.service';
import { TargetNanoParamDto } from '../common/dto/target-nano-param.dto';
import { CreateApprovalRequestDto } from './dto/create-approval-request.dto';
import {
  ApprovalDecideStatus,
  DecideApprovalRequestDto,
} from './dto/decide-approval-request.dto';
import { createId } from '@paralleldrive/cuid2';
import {
  ApprovalStatus,
  GetApprovalRequestListDto,
} from './dto/get-approval-request-list.dto';
import { Prisma } from '@b2b/database';

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

  /**
   * NANO-WORKFLOW-002
   * @description
   * - Nano 결재 요청에 관한 승인 및 반려
   * @param userId - 요청 사용자 ID
   * @param workspaceId - 요청 워크스페이스 ID
   * @param approvalRequestId - 결재 요청 ID
   * @param dto - 결재 요청 승인/반려 정보가 담긴 DTO 객체
   * @returns 승인 혹은 반려된 결재 요청 ID 및 성공 메시지
   * @throws
   * - {BadRequestException} - 잘못된 요청 데이터
   * - {NotFoundException} - Nano를 찾을 수 없음
   */
  async decideApprovalRequest(
    userId: string,
    workspaceId: string,
    approvalRequestId: string,
    dto: DecideApprovalRequestDto,
  ) {
    const { status, comment } = dto;

    await this.workspaceGuard.verifyWorkspaceOwner(userId, workspaceId);

    const approvalRequest = await this.prisma.approvalRequest.findUnique({
      where: {
        id: approvalRequestId,
      },
      include: { history: true },
    });

    if (!approvalRequest || approvalRequest.status !== 'PENDING') {
      throw new NotFoundException('처리 가능한 결재 요청이 아닙니다.');
    }

    const { nanoId, history } = approvalRequest;

    if (!history) {
      throw new NotFoundException(
        '결재 요청에 해당하는 스냅샷 이력을 찾을 수 없습니다.',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      if (status === ApprovalDecideStatus.APPROVE) {
        await tx.nano.update({
          where: {
            id: nanoId,
          },
          data: {
            title: history.title,
            content: history.content
              ? (history.content as Record<string, any>)
              : undefined,
          },
        });

        await tx.approvalRequest.update({
          where: { id: approvalRequestId },
          data: {
            status: 'PUBLISHED',
          },
        });

        await tx.pendingNano.deleteMany({
          where: { nanoId },
        });

        return {
          message: '결재 처리 완료',
          comment: comment ?? '',
          approvalRequestId,
          status: 'PUBLISHED',
          action: 'APPROVE',
        };
      }
      await tx.approvalRequest.update({
        where: { id: approvalRequestId },
        data: {
          status: 'REJECTED',
        },
      });

      await tx.pendingNano.deleteMany({
        where: { nanoId },
      });

      return {
        message: '결재 반려 완료 및 수정 가능 상태로 변환',
        comment: comment ?? '',
        approvalRequestId,
        status: 'REJECTED',
        action: 'REJECT',
      };
    });
  }

  /**
   * NANO-WORKFLOW-003
   * @description
   * - Nano 결재 대기 목록 조회
   * @param userId - 요청 사용자 ID
   * @param workspaceId - 요청 워크스페이스 ID
   * @param query - 결재 요청 정보가 담긴 DTO 객체
   * @returns 조회된 결재 요청 리스트 및 성공 메시지
   * @throws
   * - {BadRequestException} - 잘못된 요청 데이터
   * - {NotFoundException} - Nano를 찾을 수 없음
   */
  async getApprovalRequestList(
    userId: string,
    workspaceId: string,
    query: GetApprovalRequestListDto,
  ) {
    const { page = 1, limit = 20, status, keyword } = query;

    // 1. Workspace Owner 확인
    await this.workspaceGuard.verifyWorkspaceOwner(userId, workspaceId);

    // 2. 현 시각 기준 7일 계산
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // 3. WHERE 조건 절 설정
    const whereClause: Prisma.ApprovalRequestWhereInput = {
      createdAt: {
        gte: oneWeekAgo,
      },
      history: {
        workspaceId,
        ...(keyword
          ? {
              title: {
                contains: keyword,
                mode: 'insensitive',
              },
            }
          : {}),
      },
      ...(status && status !== ApprovalStatus.ALL
        ? { status: status as string }
        : {}),
    };

    const offset = (page - 1) * limit;

    // 4. DB에서 ApprovalRequestList 조회
    const approvalRequestList = await this.prisma.approvalRequest.findMany({
      where: whereClause,
      skip: offset,
      take: limit + 1,
      orderBy: {
        createdAt: 'asc',
      },
      // 4-1. writer의 사용자 이름 추출을 위해 JOIN
      // TODO: 테스트 후 연산의 무게가 큰지 확인 필요 -> 필요 시 스키마 및 함수 수정 할 것
      include: {
        history: {
          include: {
            writer: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    // 5. hasNext 확인 및 반환 대상 정렬
    const hasNext = approvalRequestList.length > limit;
    const items = hasNext
      ? approvalRequestList.slice(0, limit)
      : approvalRequestList;

    // 6. 반환할 데이터 정제
    const formattedApprovalRequestList = items.map((ar) => {
      const historyData = ar.history;
      const writer = historyData.writer;
      const requesterName = writer
        ? `${writer.firstName ?? ''} ${writer.lastName ?? ''}`.trim()
        : 'Unknown';

      return {
        approvalRequestId: ar.id,
        nanoId: ar.nanoId,
        title: historyData.title ?? 'No Title',
        status: ar.status,
        requesterName,
        createdAt: ar.createdAt,
        updatedAt: ar.updatedAt,
      };
    });

    // 7. 결과 반환
    return {
      message: '결재 요청 목록 조회 성공',
      currentPage: page,
      hasNext,
      items: formattedApprovalRequestList,
    };
  }

  /**
   * NANO-WORKFLOW-004
   * @description
   * - 사용자 본인이 전송한 결재 요청 목록 조회
   * @param userId - 요청 사용자 ID
   * @param workspaceId - 요청 워크스페이스 ID
   * @param query - 결재 요청 정보가 담긴 DTO 객체
   * @returns 조회된 결재 요청 리스트 및 성공 메시지
   * @throws
   * - {BadRequestException} - 잘못된 요청 데이터
   * - {NotFoundException} - Nano를 찾을 수 없음
   */
  async getMyApprovalRequestList(
    userId: string,
    workspaceId: string,
    query: GetApprovalRequestListDto,
  ) {
    const { page = 1, limit = 20, status, keyword } = query;

    // 1. 사용자의 워크스페이스 소속 여부 검증
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // 2. WHERE 조건절 설정
    const whereClause: Prisma.ApprovalRequestWhereInput = {
      history: {
        workspaceId,
        writerId: userId,
        ...(keyword
          ? {
              title: {
                contains: keyword,
                mode: 'insensitive',
              },
            }
          : {}),
      },
      ...(status && status !== ApprovalStatus.ALL
        ? { status: status as string }
        : {}),
    };

    // 3. OFFSET 설정
    const offset = (page - 1) * limit;

    // 4. DB의 Approval Request Table에서 사용자 ID와 일치하는 데이터 조회
    const myApprovalRequestList = await this.prisma.approvalRequest.findMany({
      where: whereClause,
      skip: offset,
      take: limit + 1,
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        history: true,
      },
    });

    // 5. hasNext 확인 및 items 설정
    const hasNext = myApprovalRequestList.length > limit;
    const items = hasNext
      ? myApprovalRequestList.slice(0, limit)
      : myApprovalRequestList;

    // 6. 반환 규격에 맞게 데이터 포맷팅
    const formattedApprovalRequestList = items.map((ar) => {
      const historyData = ar.history;
      return {
        approvalRequestId: ar.id,
        nanoId: ar.nanoId,
        title: historyData.title ?? 'No Title',
        status: ar.status,
        createdAt: ar.createdAt,
        updatedAt: ar.updatedAt,
      };
    });

    // 7. 결과 및 메시지 반환
    return {
      message: '본인 결재 요청 목록 조회 성공',
      currentPage: page,
      hasNext,
      items: formattedApprovalRequestList,
    };
  }
}
