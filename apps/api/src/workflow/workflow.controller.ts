// apps/api/src/workflow/workflow.controller.ts

/**
 * Nano Workflow Controller
 *
 * @description
 * Nano Workflow Module의 기능을 이용하기 위한 진입점 제공
 *
 * @author  <Nobody>
 * @date 2026-06-06
 */

import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { WorkflowService } from './workflow.service';
import { TargetNanoParamDto } from '../common/dto/target-nano-param.dto';
import { CreateApprovalRequestDto } from './dto/create-approval-request.dto';
import { DecideApprovalRequestDto } from './dto/decide-approval-request.dto';
import { GetApprovalRequestListDto } from './dto/get-approval-request-list.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Nano-Workflow')
@Controller('workspace')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  /**
   * NANO-WORKFLOW-001
   * @description
   * - Nano 결재 요청 생성
   * @url POST /workspace/:workspaceId/nano/:nanoId/create-approval
   */
  @Post(':workspaceId/nano/:nanoId/create-approval')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: 'Nano 결재 요청 생성',
    description: '작성 중 혹은 반려된 Nano를 최고 관리자에게 결재 요청',
  })
  @ApiResponse({
    status: 200,
    description: 'Nano 결재 요청 생성 성공',
  })
  @ApiResponse({
    status: 400,
    description: '이미 결재 진행 중이거나 잘못된 파라미터로 요청한 경우',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: '해당 워크스페이스에 소속되지 않은 사용자가 요청한 경우',
  })
  @ApiResponse({
    status: 404,
    description: '요청한 Nano가 존재하지 않는 경우',
  })
  async createApprovalRequest(
    @CurrentUser() reqUser: { userId: string },
    @Param() param: TargetNanoParamDto,
    @Body() createApprovalRequestDto: CreateApprovalRequestDto,
  ) {
    return this.workflowService.createApprovalRequest(
      reqUser.userId,
      param,
      createApprovalRequestDto,
    );
  }

  /**
   * NANO-WORKFLOW-002
   * @description
   * - Nano 결재 처리
   * @url POST /workspace/approvals/:approvalRequestId/decide
   */
  @Patch(':workspaceId/approvals/:approvalRequestId/decide')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: 'Nano 결재 승인 혹은 반려 처리',
    description:
      'Workspace의 최고 관리자 (OWNER)가 타 사용자가 전송한 결재 요청을 승인 또는 반려',
  })
  @ApiResponse({
    status: 200,
    description: '결재 처리 (승인 or 반려) 성공',
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 파라미터로 요청한 경우',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: 'Workspace의 OWNER가 아닌 경우',
  })
  @ApiResponse({
    status: 404,
    description: '요청한 결재 요청이 존재하지 않는 경우',
  })
  async decideApprovalRequest(
    @CurrentUser() reqUser: { userId: string },
    @Param('workspaceId') workspaceId: string,
    @Param('approvalRequestId') approvalRequestId: string,
    @Body() dto: DecideApprovalRequestDto,
  ) {
    return this.workflowService.decideApprovalRequest(
      reqUser.userId,
      workspaceId,
      approvalRequestId,
      dto,
    );
  }

  /**
   * NANO-WORKFLOW-003
   * @description
   * - OWNER의 결재 요청 목록 조회
   * @url GET :/workspaceId/approvals
   */
  @Get(':workspaceId/approvals')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: 'Nano 결재 요청 목록 조회 (OWNER 전용)',
    description:
      '최근 7일 이내의 결재 요청 목록을 FIFO 규칙에 맞게 정렬하여 조회',
  })
  @ApiResponse({
    status: 200,
    description: '결재 대기 목록 조회 성공',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: 'Workspace의 OWNER가 아닌 경우',
  })
  @ApiResponse({
    status: 404,
    description: '해당 Workspace 또는 결재 요청이 존재하지 않는 경우',
  })
  async getApprovalRequestList(
    @CurrentUser() reqUser: { userId: string },
    @Param('workspaceId') workspaceId: string,
    @Query() query: GetApprovalRequestListDto,
  ) {
    return this.workflowService.getApprovalRequestList(
      reqUser.userId,
      workspaceId,
      query,
    );
  }

  /**
   * NANO-WORKFLOW-004
   * @description
   * - 사용자 본인의 결재 요청 목록 조회
   * @url GET :/workspaceId/approvals/me
   */
  @Get(':workspaceId/approvals/me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '사용자 본인의 결재 요청 내역 조회',
    description:
      '워크스페이스에 소속된 사용자가 본인이 요청한 결재 내역을 조회',
  })
  @ApiResponse({
    status: 200,
    description: '결재 요청 내역 조회 성공',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: 'Workspace에 소속된 사용자가 아닌 경우',
  })
  @ApiResponse({
    status: 404,
    description: '해당 Workspace 또는 결재 요청이 존재하지 않는 경우',
  })
  async getMyApprovalRequestList(
    @CurrentUser() reqUser: { userId: string },
    @Param('workspaceId') workspaceId: string,
    @Query() query: GetApprovalRequestListDto,
  ) {
    return this.workflowService.getMyApprovalRequestList(
      reqUser.userId,
      workspaceId,
      query,
    );
  }

  /**
   * NANO-WORKFLOW-005
   * @description
   * - 사용자 본인의 결재 요청 취소
   * @url GET :/workspaceId/approvals/:approvalRequestId/cancel
   */
  @Patch(':workspaceId/approvals/:approvalRequestId/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '사용자 본인의 결재 요청 취소',
    description: '사용자 본인의 요청 여부 검사 및 취소 처리',
  })
  @ApiResponse({
    status: 200,
    description: '결재 요청 취소 완료',
  })
  @ApiResponse({
    status: 400,
    description: '결재 요청 처리되었거나 취소할 수 없는 경우',
  })
  @ApiResponse({
    status: 403,
    description: '요청자가 결재 요청 작성자가 아닌 경우',
  })
  @ApiResponse({
    status: 400,
    description: '해당하는 결재 요청이 존재하지 않는 경우',
  })
  async cancelApprovalRequest(
    @CurrentUser() reqUser: { userId: string },
    @Param('workspaceId') workspaceId: string,
    @Param('approvalRequestId') approvalRequestId: string,
  ) {
    return this.workflowService.cancelApprovalRequest(
      reqUser.userId,
      workspaceId,
      approvalRequestId,
    );
  }
}
