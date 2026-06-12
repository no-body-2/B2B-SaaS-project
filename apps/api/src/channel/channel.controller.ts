// apps/api/src/channel/channel.controller.ts

/**
 * Channel Controller
 *
 * @description
 * Channel Module의 기능을 이용하기 위한 진입점 제공
 *
 * @author  <Nobody>
 * @date 2026-06-11
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
import { ChannelService } from './channel.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('ChatRoom (워크스페이스 내부의 채팅방)')
@Controller('workspace')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  /**
   * CHAT-ROOM-001
   * @description
   * - 새로운 채팅방 생성
   * @url POST /:workspaceId/chatrooms
   */
  @Post(':workspaceId/chatrooms')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '새로운 채팅방 생성',
    description:
      '워크스페이스 내부의 OWNER, ADMIN 권한의 사용자가 새로운 채팅방 생성',
  })
  @ApiResponse({
    status: 201,
    description: '채팅방 생성 성공',
  })
  @ApiResponse({
    status: 400,
    description: '중복된 이름의 채팅방 생성을 시도하는 경우',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: '채팅방 생성 권한이 없는 사용자의 요청',
  })
  @ApiResponse({
    status: 404,
    description: '해당 워크스페이스를 찾을 수 없는 경우',
  })
  async createChatRoom(
    @CurrentUser() reqUser: { userId: string },
    @Param('workspaceId') workspaceId: string,
    @Body() createChatRoomDto: CreateChatRoomDto,
  ) {
    return this.channelService.createChatRoom(
      reqUser.userId,
      workspaceId,
      createChatRoomDto,
    );
  }
}
