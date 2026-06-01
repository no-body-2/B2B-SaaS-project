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
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { NanoService } from './nano.service';
import { WorkspaceParamDto } from '../workspace/dto/workspace-param.dto';
import { CreateNanoDto } from './dto/create-nano.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { NanoQueryDto } from './dto/nano-query.dto';

@ApiTags('Nano')
@Controller('workspace')
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
   * - Nano 목록 조회
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
}
