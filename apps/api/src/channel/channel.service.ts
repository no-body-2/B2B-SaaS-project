// apps/api/src/channel/channel.service.ts

/**
 * Channel Service
 *
 * @description
 * Channel 모듈의 Service
 *
 * @author  <Nobody>
 * @date 2026-06-11
 */

import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkspaceGuardService } from '../common/guard/workspace-guard.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class ChannelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceGuard: WorkspaceGuardService,
  ) {}

  /**
   * CHAT-ROOM-001
   * @description
   * - 채팅방 생성
   * @param userId - 채팅방을 생성하려는 사용자 ID
   * @param workspaceId - 채팅방을 생성하려하는 대상 워크스페이스 ID
   * @param dto - 채팅방 생성에 필요한 정보가 담긴 DTO
   * @returns 생성된 채팅방 정보 및 성공 메시지
   * @throws
   * - {ForbiddenException} - 채팅방을 생성하려는 사용자의 권한 부족
   * - {BadRequestException} - 이미 해당 워크스페이스에 동일한 이름의 채팅방이 존재하는 경우
   */
  async createChatRoom(
    userId: string,
    workspaceId: string,
    dto: CreateChatRoomDto,
  ) {
    const { title, description, isPrivate } = dto;

    // 1. 요청 사용자의 워크스페이스 내의 권한 확인
    await this.workspaceGuard.verifyWorkspaceAdmin(userId, workspaceId);

    // 2. 동일한 이름의 채팅방 존재 여부 검사
    const isExists = await this.prisma.chatroom.findFirst({
      where: {
        workspaceId,
        title,
      },
    });

    if (isExists) {
      throw new BadRequestException('이미 동일한 이름의 채팅방이 존재합니다.');
    }

    // 3. 트랜잭션으로 DB 작업 처리
    return this.prisma.$transaction(async (tx) => {
      const chatRoomId = `c-${createId()}`;

      // 3-1. 새 채팅방 생성
      const newRoom = await tx.chatroom.create({
        data: {
          id: chatRoomId,
          workspaceId,
          title,
          description: description || null,
          isPrivate: isPrivate ?? false,
        },
      });

      // 3-2. ChatRoomMember Table에 데이터 삽입
      await tx.chatroomMember.create({
        data: {
          chatroomId: newRoom.id,
          userId,
          workspaceId,
          role: 'OWNER',
        },
      });

      // 3-3. 결과 및 메시지 반환
      return {
        message: '채팅방 생성 성공',
        chatRoomId: newRoom.id,
        title: newRoom.title,
        description: newRoom.description,
        isPrivate: newRoom.isPrivate,
        createdAt: newRoom.createdAt,
      };
    });
  }
}
