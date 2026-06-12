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
  Get,
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

  /**
   * CHAT-ROOM-002
   * @description
   * - 채팅방 목록 조회 생성
   * @url GET /:workspaceId/chatrooms
   */
  @Get(':workspaceId/chatrooms')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '채팅방 목록 조회',
    description: '워크스페이스 내부의 채팅방 목록 조회',
  })
  @ApiResponse({
    status: 200,
    description: '채팅방 목록 조회 성공',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: '요청 사용자가 해당 워크스페이스에 소속되어 있지 않음',
  })
  async getChatRoomList(
    @CurrentUser() reqUser: { userId: string },
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.channelService.getChatRoomList(reqUser.userId, workspaceId);
  }

  /**
   * CHAT-ROOM-003
   * @description
   * - 채팅방 참여
   * @url POST /:workspaceId/chatrooms/:chatRoomId/join
   */
  @Post(':workspaceId/chatrooms/:chatRoomId/join')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '채팅방 참여',
    description:
      '해당 워크스페이스 내부의 공개 (api v1에서는 비공개 채팅방 X) 채팅방에 참여',
  })
  @ApiResponse({
    status: 200,
    description: '채팅방 참여 성공',
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않은 Access Token',
  })
  @ApiResponse({
    status: 403,
    description: '사용자가 해당 워크스페이스의 멤버가 아닌 경우',
  })
  @ApiResponse({
    status: 409,
    description: '요청 사용자가 이미 채팅방에 참여한 경우',
  })
  async joinChatRoom(
    @CurrentUser() reqUser: { userId: string },
    @Param('workspaceId') workspaceId: string,
    @Param('chatRoomId') chatRoomId: string,
  ) {
    return this.channelService.joinChatRoom(
      reqUser.userId,
      workspaceId,
      chatRoomId,
    );
  }
}
