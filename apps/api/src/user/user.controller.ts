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

import {
  Controller,
  Get,
  Patch,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

  /**
   * USER-PROFILE-002
   * @description
   * - 로그인한 사용자가 본인의 기본 정보 수정
   * @url PATCH /user/me
   */
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '본인 프로필 수정',
    description:
      '로그인한 사용자가 사용자 본인의 등록된 이름 (Firstname, Lastname)을 수정',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 정보 수정 성공',
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청으로 인한 사용자 정보 수정 실패',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않거나 만료된 Access Token으로 접근을 시도한 경우',
  })
  @ApiResponse({
    status: 403,
    description: '본인의 프로필 수정 권한이 없는 경우',
  })
  @ApiResponse({
    status: 404,
    description: '해당하는 사용자를 찾을 수 없는 경우',
  })
  async updateProfile(
    @CurrentUser() reqUser: { userId: string; email: string },
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(reqUser.userId, updateProfileDto);
  }
}
