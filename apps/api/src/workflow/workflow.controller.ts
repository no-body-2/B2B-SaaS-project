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
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
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
}
