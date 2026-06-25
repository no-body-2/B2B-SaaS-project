// apps/api/src/workspace/workspace.service.spec.ts

/**
 * Workspace Service Spec
 *
 * @description
 * WorkspaceService의 비즈니스 로직에 대한 단위 테스트
 *
 * @author  <Nobody>
 * @date 2026-06-25
 */

import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceService } from './workspace.service';
import { PrismaService } from '../prisma/prisma.service';
import { WorkspaceGuardService } from '../common/guard/workspace-guard.service';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { WorkspaceParamDto } from '../common/dto/workspace-param.dto';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { DeleteWorkspaceDto } from './dto/delete-workspace.dto';

describe('WorkspaceService', () => {
  let service: WorkspaceService;
  let mockPrismaService: {
    workspaceMember: {
      count: jest.Mock;
      findMany: jest.Mock;
      create: jest.Mock;
    };
    workspace: {
      create: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
    };
    $transaction: jest.Mock;
  };
  let mockWorkspaceGuard: {
    verifyWorkspaceOwner: jest.Mock;
    validateMembership: jest.Mock;
  };

  beforeEach(async () => {
    mockPrismaService = {
      workspaceMember: {
        count: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
      },
      workspace: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      $transaction: jest.fn(),
    };

    mockWorkspaceGuard = {
      verifyWorkspaceOwner: jest.fn(),
      validateMembership: jest.fn(),
    };

    // Prisma의 $transaction 메서드가 콜백 함수를 모방하도록 설정
    mockPrismaService.$transaction.mockImplementation(
      async (callback: (tx: typeof mockPrismaService) => Promise<unknown>) => {
        return callback(mockPrismaService);
      },
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspaceService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: WorkspaceGuardService,
          useValue: mockWorkspaceGuard,
        },
      ],
    }).compile();

    service = module.get<WorkspaceService>(WorkspaceService);
  });

  describe('createWorkspace', () => {
    const userId = 'u-user123';
    const dto: CreateWorkspaceDto = {
      name: '내 워크스페이스',
      description: '설명',
      logoUrl: 'http://logo.com',
    };

    it('성공 - 워크스페이스를 생성하고 OWNER로 지정한다 (소유 개수 3개 미만)', async () => {
      mockPrismaService.workspaceMember.count.mockResolvedValue(1);
      
      const createdWorkspace = {
        id: 'w-new123',
        name: dto.name,
        description: dto.description,
        logoUrl: dto.logoUrl,
        createdAt: new Date(),
      };
      mockPrismaService.workspace.create.mockResolvedValue(createdWorkspace);
      mockPrismaService.workspaceMember.create.mockResolvedValue({});

      const result = await service.createWorkspace(userId, dto);

      expect(mockPrismaService.workspaceMember.count).toHaveBeenCalledWith({
        where: { userId, role: 'OWNER' },
      });
      expect(mockPrismaService.workspace.create).toHaveBeenCalled();
      expect(mockPrismaService.workspaceMember.create).toHaveBeenCalled();
      expect(result.message).toBe('워크스페이스가 생성되었습니다.');
      expect(result.workspace.id).toBe(createdWorkspace.id);
    });

    it('실패 - 이미 3개 이상의 워크스페이스를 소유 중이면 ForbiddenException을 던진다', async () => {
      mockPrismaService.workspaceMember.count.mockResolvedValue(3);

      await expect(service.createWorkspace(userId, dto)).rejects.toThrow(
        ForbiddenException,
      );

      expect(mockPrismaService.workspace.create).not.toHaveBeenCalled();
    });
  });

  describe('getUsersWorkspaces', () => {
    const userId = 'u-user123';

    it('성공 - 유저가 소속된 워크스페이스 목록을 반환한다', async () => {
      const records = [
        {
          role: 'OWNER',
          workspace: {
            id: 'w-1',
            name: '워크스페이스1',
            description: '설명1',
            logoUrl: 'logo1',
            createdAt: new Date(),
          },
        },
      ];
      mockPrismaService.workspaceMember.findMany.mockResolvedValue(records);

      const result = await service.getUsersWorkspaces(userId);

      expect(mockPrismaService.workspaceMember.findMany).toHaveBeenCalled();
      expect(result.workspaces).toHaveLength(1);
      expect(result.workspaces[0].id).toBe('w-1');
      expect(result.workspaces[0].role).toBe('OWNER');
    });

    it('성공 - 소속된 워크스페이스가 없을 경우 빈 배열을 조기 반환한다', async () => {
      mockPrismaService.workspaceMember.findMany.mockResolvedValue([]);

      const result = await service.getUsersWorkspaces(userId);

      expect(result.workspaces).toEqual([]);
    });
  });

  describe('softDeleteWorkspace', () => {
    const userId = 'u-user123';
    const param: WorkspaceParamDto = { workspaceId: 'w-123' };
    const deleteDto: DeleteWorkspaceDto = { confirmName: '내 워크스페이스' };

    it('성공 - 입력한 이름이 일치하고 소유자 권한이 확인되면 소프트 딜리트 처리한다', async () => {
      mockPrismaService.workspace.findUnique.mockResolvedValue({
        id: 'w-123',
        name: '내 워크스페이스',
      });
      mockWorkspaceGuard.verifyWorkspaceOwner.mockResolvedValue(undefined);
      mockPrismaService.workspace.update.mockResolvedValue({
        id: 'w-123',
        deletedAt: new Date(),
      });

      const result = await service.softDeleteWorkspace(userId, param, deleteDto);

      expect(mockPrismaService.workspace.findUnique).toHaveBeenCalledWith({
        where: { id: 'w-123' },
      });
      expect(mockWorkspaceGuard.verifyWorkspaceOwner).toHaveBeenCalledWith(
        userId,
        'w-123',
      );
      expect(mockPrismaService.workspace.update).toHaveBeenCalled();
      expect(result.message).toContain('워크스페이스 삭제 요청이 완료되었습니다.');
    });

    it('실패 - 입력한 워크스페이스 확인용 이름이 일치하지 않을 시 BadRequestException을 던진다', async () => {
      mockPrismaService.workspace.findUnique.mockResolvedValue({
        id: 'w-123',
        name: '내 워크스페이스',
      });

      await expect(
        service.softDeleteWorkspace(userId, param, { confirmName: '잘못된 이름' }),
      ).rejects.toThrow(BadRequestException);

      expect(mockPrismaService.workspace.update).not.toHaveBeenCalled();
    });

    it('실패 - 대상 워크스페이스를 찾을 수 없는 경우 NotFoundException을 던진다', async () => {
      mockPrismaService.workspace.findUnique.mockResolvedValue(null);

      await expect(
        service.softDeleteWorkspace(userId, param, deleteDto),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
