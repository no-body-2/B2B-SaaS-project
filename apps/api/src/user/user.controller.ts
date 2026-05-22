// apps/api/src/user/user.controller.ts

/**
 * User Controller
 *
 * @description
 * User Module의 기능을 이용하기 위한 진입점 제공
 *
 * @author  <Nobody>
 * @date 2026-05-22
 */

import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('사용자 (User)')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * USER-PROFILE-001
   * @description
   * - 로그인한 사용자가 본인의 기본 정보 조회
   * @url GET /user/me
   */
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '사용자 정보 조회',
    description: '로그인한 사용자가 자신의 계정 상태 및 정보를 조회',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 정보 조회 성공',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않거나 만료된 Access Token으로 접근을 시도한 경우',
  })
  @ApiResponse({
    status: 403,
    description: '탈퇴 대기 중인 계정으로 접근을 시도한 경우',
  })
  @ApiResponse({
    status: 404,
    description: '해당하는 사용자 정보를 찾을 수 없는 경우',
  })
  async getMyProfile(
    @CurrentUser() reqUser: { userId: string; email: string },
  ) {
    return this.userService.getMyProfile(reqUser.userId);
  }
}
