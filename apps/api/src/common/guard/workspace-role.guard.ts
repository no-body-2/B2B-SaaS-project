import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WorkspaceGuardService } from './workspace-guard.service';
import { WORKSPACE_ROLES_KEY } from '../decorators/workspace-role.decorator';

@Injectable()
export class WorkspaceRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly workspaceGuard: WorkspaceGuardService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      WORKSPACE_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 데코레이터가 붙어있지 않다면 통과시킴
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;

    if (!userId) {
      return false;
    }

    // workspaceId 파싱 (param, query, body 순으로 확인)
    const workspaceId =
      request.params?.workspaceId ||
      request.query?.workspaceId ||
      request.body?.workspaceId;

    if (!workspaceId) {
      throw new BadRequestException('워크스페이스 식별자(workspaceId)가 필요합니다.');
    }

    // 멤버십 유효성 및 권한 검증
    const membership = await this.workspaceGuard.validateMembership(
      userId,
      workspaceId,
    );

    // 요구되는 권한 제한이 존재하는 경우 체크
    if (requiredRoles.length > 0) {
      const hasRole = requiredRoles.includes(membership.role);
      if (!hasRole) {
        throw new ForbiddenException('해당 워크스페이스에 대한 접근 권한이 부족합니다.');
      }
    }

    // 후속 처리에서 재조회하는 일이 없도록 request 객체에 멤버십 정보 바인딩
    request.workspaceMember = membership;

    return true;
  }
}
