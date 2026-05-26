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
  Post,
  Patch,
  Query,
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
import { Public } from '../decorators/public.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RequestEmailChangeDto } from './dto/request-email-change.dto';
import { VerifyEmailChangeDto } from './dto/verify-email-change.dto';

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

  /**
   * USER-ACCOUNT-001
   * @description
   * - 로그인한 사용자가 자신의 비밀번호를 변경
   * @url PATCH /user/me/password
   */
  @Patch('password')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '비밀번호 변경',
    description:
      '로그인한 Local 가입자의 비밀번호를 변경하고, 모든 세션의 로그아웃을 강제 진행',
  })
  @ApiResponse({
    status: 200,
    description: '비밀번호 변경 성공 및 세션 파기 완료',
  })
  @ApiResponse({
    status: 400,
    description:
      '입력 데이터 형식 오류 or 기존 비밀번호와 현재 비밀번호가 일치하는 경우',
  })
  @ApiResponse({
    status: 401,
    description:
      'Access Token이 유효하지 않거나, 현재 비밀번호가 일치하지 않는 경우',
  })
  @ApiResponse({
    status: 403,
    description:
      'Local 이외의 경로로 가입한 사용자거나, 현재 탈퇴 대기 중인 사용자인 경우',
  })
  @ApiResponse({
    status: 404,
    description: '해당하는 사용자의 정보를 찾을 수 없는 경우',
  })
  async changePassword(
    @CurrentUser() reqUser: { userId: string; email: string },
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(reqUser.userId, changePasswordDto);
  }

  /**
   * USER-ACCOUNT-002
   * @description
   * - 로그인한 사용자가 이메일 주소를 변경
   * @url PATCH /email/request
   */
  @Post('email/request')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '이메일 변경 요청',
    description: '신규 이메일 변경 요청 메일 발송 및 1분 이내 재요청 차단',
  })
  @ApiResponse({ status: 200, description: '이메일 변경 요청 메일 발송 완료' })
  @ApiResponse({
    status: 400,
    description: '기존 사용 중이던 이메일로 변경 요청을 하는 경우',
  })
  @ApiResponse({
    status: 401,
    description: 'Access Token이 유효하지 않은 경우',
  })
  @ApiResponse({
    status: 403,
    description:
      'Local 이외의 경로로 가입한 사용자가 이메일 변경 요청을 한 경우',
  })
  @ApiResponse({
    status: 404,
    description: '해당하는 사용자를 찾을 수 없는 경우',
  })
  @ApiResponse({
    status: 409,
    description: '변경하려는 이메일을 이미 다른 사용자가 사용 중인 경우',
  })
  @ApiResponse({
    status: 429,
    description:
      '요청 한도 초과: 1분 이내에 이메일 변경 요청을 2번 이상 한 경우',
  })
  async requestEmailChange(
    @CurrentUser() reqUser: { userId: string; email: string },
    @Body() dto: RequestEmailChangeDto,
  ) {
    return this.userService.requestEmailChange(reqUser.userId, dto);
  }

  /**
   * USER-PROFILE-003
   * @description
   * - 사용자의 이메일 변경 요청 최종 승인
   * @url GET /user/email/verify?token=adaf13541...
   */
  @Get('email/verify')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '이메일 변경 요청 승인',
    description:
      '이메일로 발급된 1회용 CUID Token을 Redis와 대조하여 이메일 변경 요청 승인',
  })
  @ApiResponse({
    status: 200,
    description: '이메일 변경 요청 승인 완료',
  })
  @ApiResponse({
    status: 400,
    description: '유효하지 않거나 만료된 Token을 사용한 경우',
  })
  @ApiResponse({
    status: 409,
    description:
      '인증 완료 직전, 변경하려는 이메일을 다른 사용자가 사용하여 가입한 경우',
  })
  async verifyEmailChange(@Query() verifyEmailChangeDto: VerifyEmailChangeDto) {
    return this.userService.verifyEmailChange(verifyEmailChangeDto);
  }
}
