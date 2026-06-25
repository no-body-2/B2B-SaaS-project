import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowService } from './workflow.service';
import { PrismaService } from '../prisma/prisma.service';
import { WorkspaceGuardService } from '../common/guard/workspace-guard.service';
import { dbMock } from '../prisma/__mocks__/prisma.service';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ApprovalDecideStatus } from './dto/decide-approval-request.dto';

describe('WorkflowService', () => {
  let service: WorkflowService;

  const mockWorkspaceGuard = {
    validateMembership: jest.fn().mockResolvedValue(undefined),
    verifyWorkspaceOwner: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkflowService,
        { provide: PrismaService, useValue: dbMock },
        { provide: WorkspaceGuardService, useValue: mockWorkspaceGuard },
      ],
    }).compile();

    service = module.get<WorkflowService>(WorkflowService);
  });

  describe('createApprovalRequest (결재 요청 생성)', () => {
    const userId = 'u-member';
    const param = { workspaceId: 'w-123', nanoId: 'n-456' };
    const dto = { title: '수정 타이틀', content: { text: '수정 본문' }, comment: '결재 바랍니다' };

    it('성공 - 펜딩 건이 없으면 정상적으로 History, Request, Pending 레코드를 묶어 생성한다', async () => {
      // 1. 원본 Nano 존재
      dbMock.nano.findUnique.mockResolvedValue({
        id: param.nanoId,
        workspaceId: param.workspaceId,
        title: '원본',
        content: null,
        deletedAt: null,
      } as any);
      // 2. 이미 펜딩 중인 결재 없음
      dbMock.pendingNano.findFirst.mockResolvedValue(null);
      // 3. 트랜잭션 동작 모킹
      dbMock.$transaction.mockImplementation(async (callback) => callback(dbMock));
      dbMock.nanoHistory.create.mockResolvedValue({ id: 'h-1' } as any);
      dbMock.approvalRequest.create.mockResolvedValue({ id: 'a-1', nanoId: param.nanoId } as any);
      dbMock.pendingNano.create.mockResolvedValue({} as any);

      const result = await service.createApprovalRequest(userId, param, dto);

      expect(mockWorkspaceGuard.validateMembership).toHaveBeenCalledWith(userId, param.workspaceId);
      expect(dbMock.nanoHistory.create).toHaveBeenCalled();
      expect(dbMock.approvalRequest.create).toHaveBeenCalled();
      expect(dbMock.pendingNano.create).toHaveBeenCalled();
      expect(result.status).toBe('PENDING');
    });

    it('실패 - 이미 진행 중인 결재 요청(PendingNano)이 존재할 경우 BadRequestException을 던진다', async () => {
      dbMock.nano.findUnique.mockResolvedValue({
        id: param.nanoId,
        workspaceId: param.workspaceId,
        deletedAt: null,
      } as any);
      dbMock.pendingNano.findFirst.mockResolvedValue({ approvalId: 'a-existing' } as any);

      await expect(service.createApprovalRequest(userId, param, dto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('실패 - 해당 Nano가 소프트 딜리트된 상태일 경우 NotFoundException을 던진다', async () => {
      dbMock.nano.findUnique.mockResolvedValue({
        id: param.nanoId,
        deletedAt: new Date(), // 삭제됨
      } as any);

      await expect(service.createApprovalRequest(userId, param, dto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('decideApprovalRequest (결재 승인 및 반려)', () => {
    const ownerId = 'u-owner';
    const workspaceId = 'w-123';
    const approvalRequestId = 'a-789';

    it('성공 - OWNER가 결재를 승인(APPROVE)하면, 히스토리 본문이 원본 Nano에 동기화되고 PUBLISHED 처리된다', async () => {
      const mockApprovalRequest = {
        id: approvalRequestId,
        nanoId: 'n-456',
        status: 'PENDING',
        history: {
          title: '스냅샷 타이틀',
          content: { body: '스냅샷 본문' },
        },
      };

      dbMock.approvalRequest.findUnique.mockResolvedValue(mockApprovalRequest as any);
      dbMock.$transaction.mockImplementation(async (callback) => callback(dbMock));
      dbMock.nano.update.mockResolvedValue({} as any);
      dbMock.approvalRequest.update.mockResolvedValue({} as any);
      dbMock.pendingNano.deleteMany.mockResolvedValue({} as any);

      const result = await service.decideApprovalRequest(ownerId, workspaceId, approvalRequestId, {
        status: ApprovalDecideStatus.APPROVE,
        comment: '승인합니다',
      });

      expect(mockWorkspaceGuard.verifyWorkspaceOwner).toHaveBeenCalledWith(ownerId, workspaceId);
      // 1. 원본 Nano 업데이트 검증 (히스토리 본문 반영 확인)
      expect(dbMock.nano.update).toHaveBeenCalledWith({
        where: { id: mockApprovalRequest.nanoId },
        data: {
          title: mockApprovalRequest.history.title,
          content: mockApprovalRequest.history.content,
        },
      });
      // 2. 승인 상태 변경 및 펜딩 삭제 검증
      expect(dbMock.approvalRequest.update).toHaveBeenCalledWith({
        where: { id: approvalRequestId },
        data: { status: 'PUBLISHED' },
      });
      expect(result.action).toBe('APPROVE');
    });

    it('성공 - 결재를 반려(REJECT)하면, 원본 Nano는 수정하지 않고 REJECTED 처리 후 펜딩 삭제한다', async () => {
      const mockApprovalRequest = {
        id: approvalRequestId,
        nanoId: 'n-456',
        status: 'PENDING',
        history: { title: '반려본' },
      };

      dbMock.approvalRequest.findUnique.mockResolvedValue(mockApprovalRequest as any);
      dbMock.$transaction.mockImplementation(async (callback) => callback(dbMock));
      dbMock.approvalRequest.update.mockResolvedValue({} as any);
      dbMock.pendingNano.deleteMany.mockResolvedValue({} as any);

      const result = await service.decideApprovalRequest(ownerId, workspaceId, approvalRequestId, {
        status: ApprovalDecideStatus.REJECT,
        comment: '반려합니다',
      });

      expect(dbMock.nano.update).not.toHaveBeenCalled();
      expect(dbMock.approvalRequest.update).toHaveBeenCalledWith({
        where: { id: approvalRequestId },
        data: { status: 'REJECTED' },
      });
      expect(result.action).toBe('REJECT');
    });
  });

  describe('cancelApprovalRequest (결재 취소)', () => {
    const requesterId = 'u-member';
    const workspaceId = 'w-123';
    const approvalRequestId = 'a-789';

    it('성공 - 결재 작성자 본인이 취소를 요청하면 CANCELED로 변경하고 펜딩 목록에서 지운다', async () => {
      const mockApprovalRequest = {
        id: approvalRequestId,
        nanoId: 'n-456',
        status: 'PENDING',
        history: { writerId: requesterId },
      };

      dbMock.approvalRequest.findUnique.mockResolvedValue(mockApprovalRequest as any);
      dbMock.$transaction.mockImplementation(async (callback) => callback(dbMock));
      dbMock.approvalRequest.update.mockResolvedValue({ id: approvalRequestId } as any);
      dbMock.pendingNano.deleteMany.mockResolvedValue({} as any);

      const result = await service.cancelApprovalRequest(requesterId, workspaceId, approvalRequestId);

      expect(mockWorkspaceGuard.validateMembership).toHaveBeenCalledWith(requesterId, workspaceId);
      expect(dbMock.approvalRequest.update).toHaveBeenCalledWith({
        where: { id: approvalRequestId },
        data: { status: 'CANCELED' },
      });
      expect(result.status).toBe('CANCELED');
    });

    it('실패 - 본인이 아닌 타인이 취소를 요구할 경우 ForbiddenException을 던진다', async () => {
      const mockApprovalRequest = {
        id: approvalRequestId,
        status: 'PENDING',
        history: { writerId: 'u-other-member' }, // 타인 작성
      };
      dbMock.approvalRequest.findUnique.mockResolvedValue(mockApprovalRequest as any);

      await expect(
        service.cancelApprovalRequest(requesterId, workspaceId, approvalRequestId),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
