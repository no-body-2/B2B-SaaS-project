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
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceParamDto } from './dto/workspace-param.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

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
}
