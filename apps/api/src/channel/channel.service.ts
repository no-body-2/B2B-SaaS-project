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

import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkspaceGuardService } from '../common/guard/workspace-guard.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
// import { JoinChatRoomDto } from './dto/join-chat-room.dto'; api v1에서는 사용하지 않음
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class ChannelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceGuard: WorkspaceGuardService,
  ) {}

  /* TODO
  - CHAT-ROOM-001 & CHAT-ROOM-003 로직에서 isPrivate === true 인 경우 Password 검증이 존재하지만 별도의 가드 및 스키마 파일의 변경이 없었음
  - Api v2 작성 시 자체 초대장 기능을 생성하여 비공개 채팅방 입장 로직을 변경할 것
  - 현 Api v1 에서는 isPrivate 값만 유지하고 별도의 로직은 작성하지 않음
   */
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

  /**
   * CHAT-ROOM-002
   * @description
   * - 채팅방 목록 조회
   * @param userId - 채팅방 목록을 조회하려는 사용자 ID
   * @param workspaceId - 채팅방 목록을 조회하려는 대상 워크스페이스 ID
   * @returns 조회된 채팅방 리스트 정보 및 성공 메시지
   * @throws
   * - {ForbiddenException} - 채팅방을 조회하려는 사용자의 권한 부족
   */
  async getChatRoomList(userId: string, workspaceId: string) {
    // 1. 요청 사용자 권한 검증
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // 2. DB에서 모든 채팅방 목록 조회
    const allRooms = await this.prisma.chatroom.findMany({
      where: { workspaceId },
      include: {
        members: {
          where: { userId },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // 3. 사용자가 참여한 채팅방 목록 필터링
    const formattedRooms = allRooms
      .map((room) => {
        const isJoined = room.members.length > 0;

        return {
          chatRoomId: room.id,
          title: room.title,
          description: room.description,
          isPrivate: room.isPrivate,
          isJoined,
          createdAt: room.createdAt,
          updatedAt: room.updatedAt,
        };
      })
      // 3-1. 사용자가 참여하지 않은 비공개 채팅방은 목록에서 제외
      .filter((room) => {
        return !(room.isPrivate && !room.isJoined);
      });

    // 3-2. 사용자가 참여한 채팅방을 상단으로 정렬
    formattedRooms.sort((a, b) => {
      if (a.isJoined === b.isJoined) {
        return 0;
      }
      return a.isJoined ? -1 : 1;
    });

    // 3-3. 결과 반환
    return {
      message: '채팅방 목록 조회 성공',
      rooms: formattedRooms,
    };
  }

  /**
   * CHAT-ROOM-003
   * @description
   * - 채팅방 참여
   * @param userId - 채팅방에 참여하려는 사용자 ID
   * @param workspaceId - 참여하려는 채팅방이 존재하는 워크스페이스 ID
   * @param chatRoomId - 참여하려는 채팅방 ID
   * @returns 채팅방 기본 정보 및 참여 성공 메시지
   * @throws
   * - {ForbiddenException} - 사용자가 워크스페이스에 가입하지 않은 경우
   * - {NotFoundException} - 채팅방이 존재하지 않는 경우
   * - {ConflictException} - 사용자가 이미 채팅방에 참여한 경우
   */
  async joinChatRoom(userId: string, workspaceId: string, chatRoomId: string) {
    // 1. 사용자가 워크스페이스에 가입한 사용자인지 확인
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // 2. 채팅방 유효성 검사
    const chatRoom = await this.prisma.chatroom.findUnique({
      where: { id: chatRoomId },
    });

    if (!chatRoom || chatRoom.workspaceId !== workspaceId) {
      throw new NotFoundException('해당하는 채팅방을 찾을 수 없습니다.');
    }

    // 3. 사용자가 이미 채팅방에 참여한 경우
    const isAlreadyMember = await this.prisma.chatroomMember.findFirst({
      where: { userId, chatRoomId },
    });

    if (isAlreadyMember) {
      throw new ConflictException('이미 채팅방에 참여한 사용자입니다.');
    }

    // 4. 채팅방 참여 처리
    const newChatRoomMember = await this.prisma.chatroomMember.create({
      data: {
        chatroomId: chatRoomId,
        userId: userId,
        workspaceId: workspaceId,
        role: 'MEMBER',
      },
    });

    // 5. 결과 반환
    return {
      message: '채팅방 참여 성공',
      chatRoomId,
      title: chatRoom.title,
      role: newChatRoomMember.role,
      joinedAt: newChatRoomMember.joinedAt,
    };
  }
}
