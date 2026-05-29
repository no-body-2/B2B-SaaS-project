// apps/api/src/workspace/workspace-member.controller.ts

/**
 * Workspace Member Controller
 *
 * @description
 * Workspace Module의 기능을 이용하기 위한 진입점 제공
 *
 * @author  <Nobody>
 * @date 2026-05-28
 */

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WorkspaceMemberService } from './workspace-member.service';
import { WorkspaceParamDto } from './dto/workspace-param.dto';
import { InviteMemberDto } from './dto/member/invite-member.dto';
import { AcceptInvitationDto } from './dto/member/accept-invitation.dto';
import { WorkspaceMemberQueryDto } from './dto/member/workspace-member-query.dto';
import { TargetMemberDto } from './dto/member/target-member.dto';
import { UpdateMemberRoleDto } from './dto/member/update-role.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('워크스페이스 사용자 관리 (Workspace Member)')
@Controller('workspace')
export class WorkspaceMemberController {
  constructor(
    private readonly workspaceMemberService: WorkspaceMemberService,
  ) {}

  /**
   * WORKSPACE-MEMBER-001
   * @description
   * - 워크스페이스 사용자 초대
   * @url POST /workspace/:workspaceId/invite
   */
  @Post(':workspaceId/invite')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '워크스페이스에 사용자 초대',
    description:
      '워크스페이스 관리자가 사용자 초대, 생성된 링크와 토큰 6시간 후 만료',
  })
  @ApiResponse({
    status: 200,
    description: '초대 성공 및 6시간 만료 시간 설정',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: '사용자 초대 권한이 없는 경우',
  })
  @ApiResponse({
    status: 409,
    description: '이미 해당 워크스페이스에 가입되었거나, 중복 초대인 경우',
  })
  async inviteWorkspaceMember(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: WorkspaceParamDto,
    @Body() inviteMemberDto: InviteMemberDto,
  ) {
    return this.workspaceMemberService.inviteWorkspaceMember(
      reqUser.userId,
      param,
      inviteMemberDto,
    );
  }

  /**
   * WORKSPACE-MEMBER-002
   * @description
   * - 워크스페이스 초대 수락
   * @url POST /workspace/invite/accept
   */
  @Post('invite/accept')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '발송된 초대 수락 및 워크스페이스 합류',
    description: '사용자가 워크스페이스 초대 링크를 통해 워크스페이스에 합류',
  })
  @ApiResponse({
    status: 200,
    description: '워크스페이스에 초대 수락 성공',
  })
  @ApiResponse({
    status: 400,
    description: '유효하지 않은 초대 토큰을 사용한 경우',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 410,
    description: '초대 토큰이 만료된 경우',
  })
  async acceptInvite(
    @CurrentUser() reqUser: { userId: string },
    @Body() acceptInviteDto: AcceptInvitationDto,
  ) {
    return this.workspaceMemberService.acceptWorkspaceInvitation(
      reqUser.userId,
      acceptInviteDto,
    );
  }

  /**
   * WORKSPACE-MEMBER-003
   * @description
   * - 워크스페이스 멤버 조회
   * @url GET workspace/:workspaceId/members
   */
  @Get(':workspaceId/members')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '워크스페이스 소속 멤버 조회)',
    description:
      '파라미터로 넘어온 조건에 맞는 워크스페이스 멤버 조회, 페이징 기능 지원',
  })
  @ApiResponse({
    status: 200,
    description: '워크스페이스 소속 멤버 조회 성공',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: '조회 권한이 없는 사용자가 조회를 시도하는 경우',
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 워크스페이스',
  })
  async getWorkspaceMembers(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: WorkspaceParamDto,
    @Query() query: WorkspaceMemberQueryDto,
  ) {
    return this.workspaceMemberService.getWorkspaceMembers(
      reqUser.userId,
      param,
      query,
    );
  }

  // TODO: 이메일 전송 기능 추가 후 테스트 할 것
  /**
   * WORKSPACE-MEMBER-004
   * @description
   * - 워크스페이스 멤버 권한 수정
   * @url PATCH workspace/:workspaceId/members/:targetUserId/role
   */
  @Patch(':workspaceId/members/:targetUserId/role')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '워크스페이스 멤버 권한 변경',
    description:
      '워크스페이스의 OWNER 권한을 가진 사용자가 타 사용자의 권한을 변경',
  })
  @ApiResponse({
    status: 200,
    description: '워크스페이스 멤버 권한 변경 성공',
  })
  @ApiResponse({
    status: 400,
    description: '본인의 권한 변경을 요청한 경우',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: 'OWNER 권한이 없는 사용자가 권한 변경을 요청한 경우',
  })
  @ApiResponse({
    status: 404,
    description: '대상 사용자가 해당 워크스페이스에 소속되지 않은 경우',
  })
  async updateMemberRole(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: TargetMemberDto,
    @Body() updateMemberRoleDto: UpdateMemberRoleDto,
  ) {
    return this.workspaceMemberService.updateMemberRole(
      reqUser.userId,
      param,
      updateMemberRoleDto,
    );
  }

  // TODO: 추후 이메일 전송 기능 추가 후 다시 테스트할 것
  /**
   * WORKSPACE-MEMBER-005
   * @description
   * - 워크스페이스 멤버 추방
   * @url DELETE workspace/:workspaceId/members/:targetUserId
   */
  @Delete(':workspaceId/members/:targetUserId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '워크스페이스 멤버 추방',
    description: '워크스페이스의 OWNER 권한을 가진 사용자가 타 사용자를 추방',
  })
  @ApiResponse({
    status: 200,
    description: '워크스페이스 멤버 추방 성공',
  })
  @ApiResponse({
    status: 400,
    description: '추방 대상이 워크스페이스의 OWNER 자신인 경우',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: 'OWNER 권한이 아닌 사용자가 추방을 요청한 경우',
  })
  @ApiResponse({
    status: 404,
    description: '워크스페이스에 해당 멤버가 존재하지 않는 경우',
  })
  async kickMember(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: TargetMemberDto,
  ) {
    return this.workspaceMemberService.kickMember(reqUser.userId, param);
  }

  // TODO: 추후 이메일 전송 기능 추가 후 다시 테스트할 것
  /**
   * WORKSPACE-MEMBER-006
   * @description
   * - 워크스페이스 나가기
   * @url DELETE workspace/:workspaceId/leave
   */
  @Delete(':workspaceId/leave')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '워크스페이스 나가기',
    description: '워크스페이스의 OWNER가 아닌 사용자가 워크스페이스에서 탈퇴',
  })
  @ApiResponse({
    status: 200,
    description: '워크스페이스 나가기 성공',
  })
  @ApiResponse({
    status: 400,
    description: '워크스페이스의 OWNER가 나가기 요청을 한 경우',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 404,
    description:
      '워크스페이스를 찾을 수 없거나 워크스페이스에 해당 멤버가 존재하지 않는 경우',
  })
  async leaveWorkspace(
    @CurrentUser() reqUser: { userId: string },
    @Param('workspaceId') param: WorkspaceParamDto,
  ) {
    return this.workspaceMemberService.leaveWorkspace(reqUser.userId, param);
  }
}
