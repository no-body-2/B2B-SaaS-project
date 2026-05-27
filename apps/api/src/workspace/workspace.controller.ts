// apps/api/src/workspace/workspace.controller.ts

/**
 * Workspace Controller
 *
 * @description
 * Workspace Module의 기능을 이용하기 위한 진입점 제공
 *
 * @author  <Nobody>
 * @date 2026-05-26
 */

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceParamDto } from './dto/workspace-param.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DeleteWorkspaceDto } from './dto/delete-workspace.dto';

@ApiTags('워크스페이스 (Workspace)')
@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  /**
   * WORKSPACE-CORE-001
   * 워크스페이스 생성
   * @description
   * - 로그인한 사용자가 워크스페이스를 생성
   * @url POST /workspace/create
   */
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '워크스페이스 생성',
    description:
      '로그인한 사용자가 워크스페이스를 생성, 생성한 사용자는 자동으로 워크스페이스의 OWNER 역할 지정',
  })
  @ApiResponse({
    status: 201,
    description: '워크스페이스 생성 성공 및 식별자 반환',
  })
  @ApiResponse({
    status: 400,
    description: '요청 데이터 유효성 검사 실패',
  })
  @ApiResponse({
    status: 403,
    description: '워크스페이스 소유 제한 한도 초과',
  })
  async createWorkspace(
    @CurrentUser() reqUser: { userId: string },
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ) {
    return this.workspaceService.createWorkspace(
      reqUser.userId,
      createWorkspaceDto,
    );
  }

  /**
   * WORKSPACE-CORE-002
   * 워크스페이스 목록 조회
   * @description
   * - 사용자가 본인이 소속된 워크스페이스 목록 조회
   * @url GET /workspace/list
   */
  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '워크스페이스 목록 조회',
    description: '현재 로그인한 사용자가 소속되어 있는 워크스페이스 목록 조회',
  })
  @ApiResponse({
    status: 200,
    description: '워크스페이스 목록 반환 성공 (빈 배열 반환 포함)',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않거나 만료된 Access Token',
  })
  async getUsersWorkspaces(@CurrentUser() reqUser: { userId: string }) {
    return this.workspaceService.getUsersWorkspaces(reqUser.userId);
  }

  /**
   * WORKSPACE-CORE-003
   * 워크스페이스 상세 조회
   * @description
   * - 사용자가 본인이 소속된 워크스페이스 상세 조회
   * @url GET /workspace/:workspaceId
   */
  @Get(':workspaceId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '워크스페이스 상세 조회',
    description: '특정 워크스페이스의 정보와 현재 요청 사용자의 Role 조회',
  })
  @ApiResponse({
    status: 200,
    description: '워크스페이스 상세 정보 반환 성공',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않거나 만료된 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: '워크스페이스에 소속되어 있지 않음',
  })
  @ApiResponse({
    status: 404,
    description: '해당 워크스페이스를 찾을 수 없음',
  })
  async getWorkspaceDetail(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: WorkspaceParamDto,
  ) {
    return this.workspaceService.getWorkspaceDetail(reqUser.userId, param);
  }

  /**
   * WORKSPACE-CORE-004
   * 워크스페이스 정보 수정
   * @description
   * - 사용자가 본인이 소유한 워크스페이스의 기본 정보를 수정
   * @url PATCH /workspace/:workspaceId
   */
  @Patch(':workspaceId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '워크스페이스 정보 수정',
    description:
      '워크스페이스의 최고 관리자 (OWNER) 권한을 가진 사용자가 워크스페이스의 정보를 수정',
  })
  @ApiResponse({
    status: 200,
    description: '워크스페이스 정보 수정 및 반영 성공',
  })
  @ApiResponse({
    status: 400,
    description: '요청 데이터가 유효하지 않음',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않거나 만료된 Access Token',
  })
  @ApiResponse({
    status: 403,
    description:
      '워크스페이스에 소속되지 않았거나 최고 관리자 (OWNER) 권한이 없음',
  })
  @ApiResponse({
    status: 404,
    description: '해당 워크스페이스를 찾을 수 없음',
  })
  async updateWorkspace(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: WorkspaceParamDto,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspaceService.updateWorkspace(
      reqUser.userId,
      param,
      updateWorkspaceDto,
    );
  }

  /**
   * WORKSPACE-CORE-005
   * 워크스페이스 삭제
   * @description
   * - 워크스페이스의 최고 관리자 (OWNER) 가 워크스페이스의 삭제를 요청
   * @url DELETE /workspace/:workspaceId
   */
  @Delete(':workspaceId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '워크스페이스 삭제',
    description:
      '워크스페이스의 최고 관리자 (OWNER) 가 워크스페이스의 삭제를 요청하여 30일 이후 최종 삭제',
  })
  @ApiResponse({
    status: 200,
    description: 'Soft Delete 성공, 30일 후 완전 삭제',
  })
  @ApiResponse({
    status: 400,
    description:
      '입력한 Confirm Name이 실제 워크스페이스 이름과 일치하지 않는 경우',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description:
      '해당 워크스페이스에 소속되지 않았거나, 최고 관리자 (OWNER) 권한이 없는 경우',
  })
  @ApiResponse({
    status: 404,
    description: '해당 워크스페이스를 찾을 수 없는 경우',
  })
  async deleteWorkspace(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: WorkspaceParamDto,
    @Body() deleteWorkspaceDto: DeleteWorkspaceDto,
  ) {
    return this.workspaceService.softDeleteWorkspace(
      reqUser.userId,
      param,
      deleteWorkspaceDto,
    );
  }
}
