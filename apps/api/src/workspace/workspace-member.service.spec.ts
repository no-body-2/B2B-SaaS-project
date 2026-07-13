import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceMemberService } from './workspace-member.service';
import { PrismaService } from '../prisma/prisma.service';
import { WorkspaceGuardService } from '../common/guard/workspace-guard.service';
import { MailerService } from '../mailer/mailer.service';
import { dbMock } from '../prisma/__mocks__/prisma.service';
import {
  ConflictException,
  BadRequestException,
  GoneException,
} from '@nestjs/common';

import { EventEmitter2 } from '@nestjs/event-emitter';

describe('WorkspaceMemberService', () => {
  let service: WorkspaceMemberService;

  const mockWorkspaceGuard = {
    verifyWorkspaceAdmin: jest.fn().mockResolvedValue(undefined),
    verifyWorkspaceOwner: jest.fn().mockResolvedValue(undefined),
    validateMembership: jest.fn().mockResolvedValue({ role: 'MEMBER' }),
  };

  const mockMailerService = {
    sendInvitationMail: jest.fn(),
  };

  const mockEventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspaceMemberService,
        { provide: PrismaService, useValue: dbMock },
        { provide: WorkspaceGuardService, useValue: mockWorkspaceGuard },
        { provide: MailerService, useValue: mockMailerService },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<WorkspaceMemberService>(WorkspaceMemberService);
  });

  describe('inviteWorkspaceMember (팀원 초대)', () => {
    const userId = 'u-admin';
    const param = { workspaceId: 'w-123' };
    const inviteDto = { email: 'target@example.com', invitation: '초대합니다' };

    it('성공 - 권한 확인 후 초대 요청을 생성하고 이메일을 발송한다', async () => {
      // 1. 가입한 멤버가 아님
      dbMock.user.findFirst.mockResolvedValue(null);
      // 2. 펜딩 중인 초대도 없음
      dbMock.workspaceInvitation.count.mockResolvedValue(0);
      // 3. 초대 데이터 생성 모킹
      dbMock.workspaceInvitation.create.mockResolvedValue({
        id: 'inv-1',
        targetEmail: inviteDto.email,
        expiresAt: new Date(),
      } as any);
      // 4. 워크스페이스 명세
      dbMock.workspace.findUnique.mockResolvedValue({
        name: '초대 워크스페이스',
      } as any);

      const result = await service.inviteWorkspaceMember(
        userId,
        param,
        inviteDto,
      );

      expect(mockWorkspaceGuard.verifyWorkspaceAdmin).toHaveBeenCalledWith(
        userId,
        param.workspaceId,
      );
      expect(dbMock.workspaceInvitation.create).toHaveBeenCalled();
      expect(mockMailerService.sendInvitationMail).toHaveBeenCalled();
      expect(result.message).toContain(
        '초대 요청이 성공적으로 전송되었습니다.',
      );
    });

    it('실패 - 이미 워크스페이스에 소속된 멤버이면 ConflictException을 던진다', async () => {
      dbMock.user.findFirst.mockResolvedValue({ id: 'u-target' } as any);
      dbMock.workspaceMember.count.mockResolvedValue(1); // 가입됨

      await expect(
        service.inviteWorkspaceMember(userId, param, inviteDto),
      ).rejects.toThrow(ConflictException);
    });

    it('실패 - 이미 대기(PENDING) 상태의 초대가 존재할 경우 ConflictException을 던진다', async () => {
      dbMock.user.findFirst.mockResolvedValue(null);
      dbMock.workspaceInvitation.count.mockResolvedValue(1); // 펜딩 존재

      await expect(
        service.inviteWorkspaceMember(userId, param, inviteDto),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('acceptWorkspaceInvitation (초대 수락)', () => {
    const userId = 'u-target';
    const dto = { invitationToken: 'token-abc' };

    it('성공 - 토큰 검증 완료 시 트랜잭션으로 상태를 변경하고 멤버 레코드를 생성한다', async () => {
      const mockInvitation = {
        id: 'inv-1',
        workspaceId: 'w-123',
        targetEmail: 'target@example.com',
        status: 'PENDING',
        expiresAt: new Date(Date.now() + 1000 * 60), // 1분 뒤 만료
      };
      const mockUser = { id: userId, email: 'target@example.com' };

      dbMock.workspaceInvitation.findUnique.mockResolvedValue(
        mockInvitation as any,
      );
      dbMock.user.findUnique.mockResolvedValue(mockUser as any);
      dbMock.workspaceMember.count.mockResolvedValue(0); // 멤버 아님
      dbMock.workspace.findUnique.mockResolvedValue({
        name: '초대 워크스페이스',
      } as any);

      // 트랜잭션 동작 모킹
      dbMock.$transaction.mockImplementation(async (callback) =>
        callback(dbMock),
      );
      dbMock.workspaceInvitation.update.mockResolvedValue({} as any);
      dbMock.workspaceMember.create.mockResolvedValue({} as any);

      const result = await service.acceptWorkspaceInvitation(userId, dto);

      expect(dbMock.workspaceInvitation.update).toHaveBeenCalledWith({
        where: { id: mockInvitation.id },
        data: { status: 'ACCEPTED' },
      });
      expect(dbMock.workspaceMember.create).toHaveBeenCalled();
      expect(result.message).toContain('팀원이 되신 것을 축하합니다.');
    });

    it('실패 - 이미 처리된 초대 요청(status != PENDING)이면 BadRequestException을 던진다', async () => {
      dbMock.workspaceInvitation.findUnique.mockResolvedValue({
        id: 'inv-1',
        status: 'ACCEPTED',
      } as any);

      await expect(
        service.acceptWorkspaceInvitation(userId, dto),
      ).rejects.toThrow(BadRequestException);
    });

    it('실패 - 만료된 초대 토큰일 경우 EXPIRED 상태 갱신 후 GoneException을 던진다', async () => {
      dbMock.workspaceInvitation.findUnique.mockResolvedValue({
        id: 'inv-1',
        status: 'PENDING',
        expiresAt: new Date(Date.now() - 1000), // 이미 만료
      } as any);
      dbMock.workspaceInvitation.update.mockResolvedValue({} as any);

      await expect(
        service.acceptWorkspaceInvitation(userId, dto),
      ).rejects.toThrow(GoneException);
      expect(dbMock.workspaceInvitation.update).toHaveBeenCalledWith({
        where: { id: 'inv-1' },
        data: { status: 'EXPIRED' },
      });
    });
  });

  describe('updateMemberRole (멤버 권한 변경 및 OWNER 수 한도 검사)', () => {
    const userId = 'u-owner';
    const param = { workspaceId: 'w-123', targetUserId: 'u-target' };
    const roleDto = { newRole: 'OWNER' as const };

    it('성공 - OWNER가 타인을 OWNER로 승격 요청 시, 대상의 소유 수가 3개 미만이면 성공한다', async () => {
      // 1. OWNER 소유 횟수 1개
      dbMock.workspaceMember.count.mockResolvedValue(1);
      // 2. 권한 변경 성공 모킹
      dbMock.workspaceMember.update.mockResolvedValue({
        workspaceId: param.workspaceId,
        userId: param.targetUserId,
        role: 'OWNER',
      } as any);

      const result = await service.updateMemberRole(userId, param, roleDto);

      expect(mockWorkspaceGuard.verifyWorkspaceOwner).toHaveBeenCalledWith(
        userId,
        param.workspaceId,
      );
      expect(dbMock.workspaceMember.count).toHaveBeenCalledWith({
        where: { userId: param.targetUserId, role: 'OWNER' },
      });
      expect(result.updatedRole).toBe('OWNER');
    });

    it('실패 - 본인의 권한을 스스로 변경하려고 할 시 BadRequestException을 던진다', async () => {
      await expect(
        service.updateMemberRole(
          userId,
          { ...param, targetUserId: userId },
          roleDto,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('실패 - 대상 멤버가 이미 3개 이상의 워크스페이스 OWNER일 경우 승격 요청을 차단한다 (BadRequestException)', async () => {
      dbMock.workspaceMember.count.mockResolvedValue(3); // 이미 3개 소유

      await expect(
        service.updateMemberRole(userId, param, roleDto),
      ).rejects.toThrow(BadRequestException);
      expect(dbMock.workspaceMember.update).not.toHaveBeenCalled();
    });
  });
});
