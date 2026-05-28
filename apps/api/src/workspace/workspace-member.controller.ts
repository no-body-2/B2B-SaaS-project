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
  Post,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WorkspaceMemberService } from './workspace-member.service';
import { WorkspaceParamDto } from './dto/workspace-param.dto';
import { InviteMemberDto } from './dto/member/invite-member.dto';
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
}
