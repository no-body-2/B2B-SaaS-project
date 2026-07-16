// apps/api/src/nano/nano.controller.ts

/**
 * Nano Core Controller
 *
 * @description
 * Nano Module의 기능을 이용하기 위한 진입점 제공
 *
 * @author  <Nobody>
 * @date 2026-05-30
 */

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { NanoService } from './nano.service';
import { WorkspaceParamDto } from '../common/dto/workspace-param.dto';
import { CreateNanoDto } from './dto/create-nano.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { NanoQueryDto } from './dto/nano-query.dto';
import { NanoChildParamDto } from './dto/child-nano-param.dto';
import { TargetNanoParamDto } from '../common/dto/target-nano-param.dto';
import { UpdateNanoDto } from './dto/update-nano.dto';
import { MoveNanoDto } from './dto/move-nano.dto';
import { WorkspaceRole } from '../common/decorators/workspace-role.decorator';
import { WorkspaceRoleGuard } from '../common/guard/workspace-role.guard';

@ApiTags('Nano')
@Controller('workspace')
@WorkspaceRole()
@UseGuards(WorkspaceRoleGuard)
export class NanoController {
  constructor(private readonly nanoService: NanoService) {}

  /**
   * NANO-CORE-001
   * @description
   * - Nano 생성
   * @url POST /workspace/:workspaceId/create-nano
   */
  @Post(':workspaceId/create-nano')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '새로운 Nano 생성',
    description: '워크스페이스 내부에 새로운 Nano 생성',
  })
  @ApiResponse({
    status: 201,
    description: '새로운 Nano 생성 성공',
  })
  @ApiResponse({
    status: 400,
    description: '유효하지 않은 입력데이터가 전달된 경우',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: '현재 Workspace에 소속되지 않은 사용자의 요청',
  })
  @ApiResponse({
    status: 404,
    description: '해당하는 parentNano or Workspace를 찾을 수 없는 경우',
  })
  async createNano(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: WorkspaceParamDto,
    @Body() createNanoDto: CreateNanoDto,
  ) {
    return this.nanoService.createNano(reqUser.userId, param, createNanoDto);
  }

  /**
   * NANO-CORE-002
   * @description
   * - 최상위 Nano 목록 조회
   * @url GET /workspace/:workspaceId/nanos/root
   */
  @Get(':workspaceId/nanos/root')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '최상위 Nano 목록 조회',
    description: '워크스페이스 내부에 소속된 최상위 Nano 목록 조회',
  })
  @ApiResponse({
    status: 200,
    description: '최상위 Nano 페이징 목록 조회 성공',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: '현재 Workspace에 소속되지 않은 사용자의 요청',
  })
  async getRootNanos(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: WorkspaceParamDto,
    @Query() query: NanoQueryDto,
  ) {
    return this.nanoService.getRootNanos(reqUser.userId, param, query);
  }

  /**
   * NANO-CORE-002
   * @description
   * - 하위 Nano 목록 조회
   * @url GET /workspace/:workspaceId/nanos/:parentNanoId/child
   */
  @Get(':workspaceId/nanos/:parentNanoId/child')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '특정 Parent Nano에 속한 하위 Nano 목록 조회',
    description: 'Sidebar or Toggle 등 UI에서 사용되는 하위 Nano 목록 조회',
  })
  @ApiResponse({
    status: 200,
    description: '하위 Nano 페이징 목록 조회 성공',
  })
  @ApiResponse({
    status: 400,
    description: '해당 Parent Nano가 현재 워크스페이스 소속이 아닌 경우',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: '현재 Workspace에 소속되지 않은 사용자의 요청',
  })
  @ApiResponse({
    status: 404,
    description: '해당 Parent Nano가 존재하지 않거나, 찾을 수 없는 경우',
  })
  async getChildNanos(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: NanoChildParamDto,
    @Query() query: NanoQueryDto,
  ) {
    return this.nanoService.getChildNanos(reqUser.userId, param, query);
  }

  /**
   * NANO-CORE-009
   * @description
   * - 삭제된 Nano 목록 조회
   * @url GET /workspace/:workspaceId/nanos/deleted
   */
  @Get(':workspaceId/nanos/deleted')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '삭제된 Nano 목록 조회',
    description:
      '워크스페이스 내에서 삭제(Soft Delete)된 Nanos 문서들의 목록을 조회',
  })
  @ApiResponse({
    status: 200,
    description: '삭제된 Nano 목록 조회 성공',
  })
  async listDeletedNanos(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: WorkspaceParamDto,
  ) {
    return this.nanoService.listDeletedNanos(reqUser.userId, param);
  }

  /**
   * NANO-CORE-004
   * @description
   * - Nano 상세 조회
   * @url GET /workspace/:workspaceId/nanos/:nanoId
   */
  @Get(':workspaceId/nanos/:nanoId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: 'Nano 상세 조회',
    description: '해당 워크스페이스 내부에 속한 Nano의 상세 정보를 조회',
  })
  @ApiResponse({
    status: 200,
    description: 'Nano 상세 조회 성공',
  })
  @ApiResponse({
    status: 400,
    description: '해당하는 Nano가 현재 워크스페이스에 소속된 상태가 아님',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: '현재 Workspace에 소속되지 않은 사용자의 요청',
  })
  @ApiResponse({
    status: 404,
    description: '해당 Nano가 존재하지 않거나, 찾을 수 없는 경우',
  })
  async getNanoDetail(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: TargetNanoParamDto,
  ) {
    return this.nanoService.getNanoDetail(reqUser.userId, param);
  }

  /**
   * NANO-CORE-005
   * @description
   * - Nano 수정
   * @url PATCH /workspace/:workspaceId/nanos/:nanoId
   */
  @Patch(':workspaceId/nanos/:nanoId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: 'Nano Title 및 Content 수정',
    description:
      'Nano의 Title 및 Content를 수정 : OWNER or ADMIN 권한의 사용자가 요청 시 즉시 수정, 일반 사용자 요청 시 결재 요청으로 넘어감',
  })
  @ApiResponse({
    status: 200,
    description: 'Nano 수정 (요청) 성공',
  })
  @ApiResponse({
    status: 400,
    description:
      '입력 데이터가 잘못 되었거나, 현재 진행 중인 결재 요청이 있는 경우',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: '해당 워크스페이스에 소속되어 있지 않은 사용자의 요청',
  })
  @ApiResponse({
    status: 404,
    description: '해당 Nano가 존재하지 않거나, 찾을 수 없는 경우',
  })
  async updateNano(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: TargetNanoParamDto,
    @Body() updatedNanoDto: UpdateNanoDto,
  ) {
    return this.nanoService.updateNano(reqUser.userId, param, updatedNanoDto);
  }

  /**
   * NANO-CORE-006
   * @description
   * - Nano 위치 수정
   * @url PATCH /workspace/:workspaceId/nanos/:nanoId/position
   */
  @Patch(':workspaceId/nanos/:nanoId/position')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: 'Nano 위치 수정 및 순서 변경 (Frontend에서 Drag & Drop으로 이동)',
    description: 'Nano 트리 구조 재배치',
  })
  @ApiResponse({
    status: 200,
    description: 'Nano 위치 수정 성공',
  })
  @ApiResponse({
    status: 400,
    description: '자신 또는 자신의 하위 Nano로 이동하려 하는 경우',
  })
  @ApiResponse({
    status: 403,
    description: '해당 워크스페이스 내의 OWNER 권한이 없는 경우',
  })
  @ApiResponse({
    status: 404,
    description: '해당 Nano가 존재하지 않거나, 찾을 수 없는 경우',
  })
  async moveNano(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: TargetNanoParamDto,
    @Body() moveNanoDto: MoveNanoDto,
  ) {
    return this.nanoService.moveNano(reqUser.userId, param, moveNanoDto);
  }

  // TODO: Test 필요
  /**
   * NANO-CORE-007
   * @description
   * - Nano 삭제
   * @url DELETE /workspace/:workspaceId/nanos/:nanoId
   */
  @Delete(':workspaceId/nanos/:nanoId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: 'Nano 삭제',
    description:
      '해당 Nano와 하위 Nano들을 삭제, Soft Delete 방식으로 30일 이내 복구 가능',
  })
  @ApiResponse({
    status: 200,
    description: 'Nano Soft Delete 성공',
  })
  @ApiResponse({
    status: 400,
    description: '해당 Nano가 타 워크스페이스 소속인 경우',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description:
      '삭제 요청자가 해당 Nano의 작성자가 아니거나, OWNER 권한이 없는 경우',
  })
  @ApiResponse({
    status: 404,
    description: '해당 Nano가 존재하지 않거나, 찾을 수 없는 경우',
  })
  async deleteNano(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: TargetNanoParamDto,
  ) {
    return this.nanoService.deleteNano(reqUser.userId, param);
  }

  /**
   * NANO-CORE-008
   * @description
   * - 삭제된 Nano 복구
   * @url PATCH /workspace/:workspaceId/nanos/:nanoId/restore
   */
  @Patch(':workspaceId/nanos/:nanoId/restore')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: 'Nano 복구',
    description: '삭제된 Nano와 하위 Nano 문서들을 복구',
  })
  @ApiResponse({
    status: 200,
    description: 'Nano 복구 성공',
  })
  @ApiResponse({
    status: 400,
    description:
      '해당 Nano가 타 워크스페이스 소속이거나, 이미 복구된 상태인 경우',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description:
      '복구 요청자가 OWNER 권한이 없거나 해당 Nano의 작성자가 아닌 경우',
  })
  @ApiResponse({
    status: 404,
    description: '해당 Nano가 존재하지 않는 경우',
  })
  async restoreNano(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: TargetNanoParamDto,
  ) {
    return this.nanoService.restoreNano(reqUser.userId, param);
  }
}
