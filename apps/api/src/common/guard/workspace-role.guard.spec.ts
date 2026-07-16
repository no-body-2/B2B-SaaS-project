import { WorkspaceRoleGuard } from './workspace-role.guard';
import { WorkspaceGuardService } from './workspace-guard.service';
import { Reflector } from '@nestjs/core';
import {
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';

describe('WorkspaceRoleGuard', () => {
  let guard: WorkspaceRoleGuard;
  let reflector: jest.Mocked<Reflector>;
  let workspaceGuardService: jest.Mocked<WorkspaceGuardService>;

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as any;

    workspaceGuardService = {
      validateMembership: jest.fn(),
    } as any;

    guard = new WorkspaceRoleGuard(reflector, workspaceGuardService);
  });

  const createMockContext = (
    userId: string | undefined,
    params: any,
    query: any = {},
    body: any = {},
  ): ExecutionContext => {
    const req = {
      user: userId ? { userId } : undefined,
      params,
      query,
      body,
      workspaceMember: undefined,
    };
    return {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => req,
      }),
    } as any;
  };

  it('should pass if requiredRoles metadata is not set', async () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);

    const context = createMockContext('user-1', { workspaceId: 'ws-1' });
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should throw BadRequestException if workspaceId is missing', async () => {
    reflector.getAllAndOverride.mockReturnValue(['OWNER']);

    const context = createMockContext('user-1', {});
    await expect(guard.canActivate(context)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw ForbiddenException if user does not have required role', async () => {
    reflector.getAllAndOverride.mockReturnValue(['OWNER']);
    workspaceGuardService.validateMembership.mockResolvedValue({
      userId: 'user-1',
      workspaceId: 'ws-1',
      role: 'MEMBER',
    } as any);

    const context = createMockContext('user-1', { workspaceId: 'ws-1' });
    await expect(guard.canActivate(context)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should pass and attach member details if user has correct role', async () => {
    reflector.getAllAndOverride.mockReturnValue(['OWNER', 'ADMIN']);
    const mockMembership = {
      userId: 'user-1',
      workspaceId: 'ws-1',
      role: 'ADMIN',
    };
    workspaceGuardService.validateMembership.mockResolvedValue(
      mockMembership as any,
    );

    const context = createMockContext('user-1', { workspaceId: 'ws-1' });
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    const request = context.switchToHttp().getRequest();
    expect(request.workspaceMember).toBe(mockMembership);
  });
});
