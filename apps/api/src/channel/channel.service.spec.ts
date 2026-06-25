import { Test, TestingModule } from '@nestjs/testing';
import { ChannelService } from './channel.service';
import { PrismaService } from '../prisma/prisma.service';
import { WorkspaceGuardService } from '../common/guard/workspace-guard.service';
import { ChannelGateway } from './channel.gateway';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { dbMock } from '../prisma/__mocks__/prisma.service';
import { BadRequestException, ForbiddenException, NotFoundException, ConflictException } from '@nestjs/common';

describe('ChannelService', () => {
  let service: ChannelService;

  const mockWorkspaceGuard = {
    validateMembership: jest.fn().mockResolvedValue(undefined),
  };

  const mockChannelGateway = {
    broadcastNewMessage: jest.fn(),
    broadcastUpdateMessage: jest.fn(),
    broadcastDeleteMessage: jest.fn(),
  };

  const mockEventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelService,
        { provide: PrismaService, useValue: dbMock },
        { provide: WorkspaceGuardService, useValue: mockWorkspaceGuard },
        { provide: ChannelGateway, useValue: mockChannelGateway },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<ChannelService>(ChannelService);
  });

  describe('joinChatRoom (채팅방 참여 및 비공개 방 차단 가드)', () => {
    const userId = 'u-member';
    const workspaceId = 'w-123';
    const chatroomId = 'c-456';

    it('성공 - 공개방인 경우 멤버로 정상 참여 처리한다', async () => {
      dbMock.chatroom.findUnique.mockResolvedValue({
        id: chatroomId,
        workspaceId,
        isPrivate: false, // 공개방
        title: '공개 잡담방',
      } as any);
      dbMock.chatroomMember.findFirst.mockResolvedValue(null); // 미참여 상태
      dbMock.chatroomMember.create.mockResolvedValue({
        role: 'MEMBER',
        joinedAt: new Date(),
      } as any);

      const result = await service.joinChatRoom(userId, workspaceId, chatroomId);

      expect(mockWorkspaceGuard.validateMembership).toHaveBeenCalledWith(userId, workspaceId);
      expect(dbMock.chatroomMember.create).toHaveBeenCalled();
      expect(result.message).toBe('채팅방 참여 성공');
    });

    it('실패 - 비공개 채팅방(isPrivate: true)인 경우 직접 입장을 거부하고 ForbiddenException을 던진다 (v1 가드)', async () => {
      dbMock.chatroom.findUnique.mockResolvedValue({
        id: chatroomId,
        workspaceId,
        isPrivate: true, // 비공개방
      } as any);

      await expect(
        service.joinChatRoom(userId, workspaceId, chatroomId),
      ).rejects.toThrow(ForbiddenException);

      expect(dbMock.chatroomMember.create).not.toHaveBeenCalled();
    });

    it('실패 - 이미 참여한 채팅방인 경우 ConflictException을 던진다', async () => {
      dbMock.chatroom.findUnique.mockResolvedValue({
        id: chatroomId,
        workspaceId,
        isPrivate: false,
      } as any);
      dbMock.chatroomMember.findFirst.mockResolvedValue({ userId } as any); // 이미 존재

      await expect(
        service.joinChatRoom(userId, workspaceId, chatroomId),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('leaveChatRoom (채팅방 퇴장 및 최후 멤버 퇴장 시 자동 파괴)', () => {
    const userId = 'u-member';
    const workspaceId = 'w-123';
    const chatroomId = 'c-456';

    it('성공 - 퇴장 후 남은 멤버수가 0명이면 채팅방을 완전히 삭제(delete)한다', async () => {
      dbMock.chatroomMember.findFirst.mockResolvedValue({
        userId,
        chatroomId,
        role: 'MEMBER',
      } as any);

      dbMock.$transaction.mockImplementation(async (callback) => callback(dbMock));
      dbMock.chatroomMember.delete.mockResolvedValue({} as any);
      // 남은 멤버 0명 모킹
      dbMock.chatroomMember.findMany.mockResolvedValue([]);
      dbMock.chatroom.delete.mockResolvedValue({} as any);

      const result = await service.leaveChatRoom(userId, workspaceId, chatroomId);

      expect(dbMock.chatroom.delete).toHaveBeenCalledWith({
        where: { id: chatroomId },
      });
      expect(result.message).toContain('채팅방에 남은 사용자가 없어 자동 삭제 처리되었습니다.');
    });

    it('성공 - OWNER 퇴장 시, 남은 멤버 중 가입일이 가장 오래된 멤버가 자동으로 OWNER로 승격된다', async () => {
      dbMock.chatroomMember.findFirst.mockResolvedValue({
        userId,
        chatroomId,
        role: 'OWNER', // 나가는 사람의 권한이 OWNER
      } as any);

      dbMock.$transaction.mockImplementation(async (callback) => callback(dbMock));
      dbMock.chatroomMember.delete.mockResolvedValue({} as any);
      
      const mockRemaining = [
        { userId: 'u-next-owner', joinedAt: new Date(Date.now() - 1000) },
        { userId: 'u-other-member', joinedAt: new Date() },
      ];
      dbMock.chatroomMember.findMany.mockResolvedValue(mockRemaining as any);
      dbMock.chatroomMember.update.mockResolvedValue({} as any);
      dbMock.chatroom.update.mockResolvedValue({} as any);

      const result = await service.leaveChatRoom(userId, workspaceId, chatroomId);

      // joinedAt 시점이 가장 앞선(오래된) u-next-owner가 OWNER로 승격되는지 검증
      expect(dbMock.chatroomMember.update).toHaveBeenCalledWith({
        where: {
          chatroomId_userId: {
            chatroomId,
            userId: 'u-next-owner',
          },
        },
        data: { role: 'OWNER' },
      });
      expect(result.nextOwnerId).toBe('u-next-owner');
    });
  });

  describe('delegateChatRoomOwner (채팅방 OWNER 권한 수동 위임)', () => {
    const ownerId = 'u-owner';
    const workspaceId = 'w-123';
    const chatroomId = 'c-456';
    const targetUserId = 'u-target';

    it('성공 - 기존 OWNER를 MEMBER로 낮추고 타깃 멤버를 OWNER로 승격시킨다', async () => {
      // 1. 위임자 정보 OWNER 확인
      dbMock.chatroomMember.findUnique
        .mockResolvedValueOnce({ role: 'OWNER' } as any) // ownerId 조회
        .mockResolvedValueOnce({ userId: targetUserId } as any); // targetUserId 조회

      dbMock.$transaction.mockImplementation(async (callback) => callback(dbMock));
      dbMock.chatroomMember.update.mockResolvedValue({} as any);
      dbMock.chatroom.update.mockResolvedValue({} as any);

      const result = await service.delegateChatRoomOwner(ownerId, workspaceId, chatroomId, {
        targetUserId,
      });

      // 1. 위임 대상 승격 검증
      expect(dbMock.chatroomMember.update).toHaveBeenNthCalledWith(1, {
        where: {
          chatroomId_userId: { chatroomId, userId: targetUserId },
        },
        data: { role: 'OWNER' },
      });
      // 2. 위임자 강등 검증
      expect(dbMock.chatroomMember.update).toHaveBeenNthCalledWith(2, {
        where: {
          chatroomId_userId: { chatroomId, userId: ownerId },
        },
        data: { role: 'MEMBER' },
      });
      expect(result.previousOwnerId).toBe(ownerId);
      expect(result.newOwnerId).toBe(targetUserId);
    });

    it('실패 - 자신에게 방장 권한을 넘기려 시도하면 BadRequestException을 던진다', async () => {
      await expect(
        service.delegateChatRoomOwner(ownerId, workspaceId, chatroomId, { targetUserId: ownerId }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
