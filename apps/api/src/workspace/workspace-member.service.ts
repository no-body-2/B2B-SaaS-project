// apps/api/src/workspace/workspace-member.service.ts

/**
 * Workspace Member Service
 *
 * @description
 * Workspace 모듈의 Member Service
 *
 * @author  <Nobody>
 * @date 2026-05-28
 */

import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InviteMemberDto } from './dto/member/invite-member.dto';
import { WorkspaceParamDto } from './dto/workspace-param.dto';
import { WorkspaceGuardService } from './workspace-guard.service';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class WorkspaceMemberService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceGuard: WorkspaceGuardService,
  ) {}

  /**
   * WORKSPACE-MEMBER-001
   * 워크스페이스 멤버 초대
   * @description
   * - 권한 검증 및 초대 형식 유효성 및 중복 검사 후 1회용 초대 토큰 발급
   * @param userId - 초대 요청을 보낸 사용자의 ID
   * @param param - 워크스페이스 파라미터
   * @param dto - 초대 요청 DTO
   * @returns - 1회용 초대 토큰 및 초대 성공 메시지
   * @throws
   * - {ForbiddenException}: 사용자 권한이 없을 경우
   * - {NotFoundException}: 사용자가 워크스페이스에 존재하지 않을 경우
   * - {ConflictException}: 이미 초대된 사용자거나 이미 해당 워크스페이스에 소속된 사용자일 경우
   */
  async inviteWorkspaceMember(
    userId: string,
    param: WorkspaceParamDto,
    dto: InviteMemberDto,
  ) {
    const { workspaceId } = param;

    // 1. 권한 검증
    await this.workspaceGuard.verifyWorkspaceAdmin(userId, workspaceId);

    // 2. 대상 사용자 검색
    const targetUser = await this.prisma.user.findUnique({
      where: { id: dto.email },
    });

    // 3. 대상 사용자 워크스페이스 합류 여부 검사
    if (targetUser) {
      const isAlreadyMember = await this.prisma.workspaceMember.count({
        where: { workspaceId, userId: targetUser.id },
      });

      if (isAlreadyMember > 0) {
        throw new ConflictException(
          '이미 해당 워크스페이스에 소속된 사용자입니다.',
        );
      }
    }

    // 4. 중복 초대 여부 검사
    const activeInvitationCount = await this.prisma.workspaceInvitation.count({
      where: {
        workspaceId,
        targetEmail: dto.email,
        status: 'PENDING',
        expiresAt: { gt: new Date() },
      },
    });

    if (activeInvitationCount > 0) {
      throw new ConflictException(
        '이미 초대된 사용자입니다. 초대 요청을 확인해주세요.',
      );
    }

    // 5. 토큰 및 만료 시간 설정
    const invitationToken = createId();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 6);

    // 6. 초대 요청 생성
    const newInvitation = await this.prisma.workspaceInvitation.create({
      data: {
        id: `inv-${createId()}`,
        workspaceId,
        inviterId: userId,
        targetEmail: dto.email,
        invitation: dto.invitation,
        token: invitationToken,
        status: 'PENDING',
        expiresAt,
      },
    });

    // 7. 결과 반환
    return {
      message: '초대 요청이 성공적으로 전송되었습니다. 6시간 후 만료됩니다.',
      invitationId: newInvitation.id,
      workspaceId,
      invitedEmail: newInvitation.targetEmail,
      invitation: newInvitation.invitation,
      invitationToken,
      expiresAt: newInvitation.expiresAt,
    };
  }
}
