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
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkspaceGuardService } from '../common/guard/workspace-guard.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
// import { JoinChatRoomDto } from './dto/join-chat-room.dto'; api v1에서는 사용하지 않음
import { DelegateOwnerDto } from './dto/delegate-owner.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { GetChatMessageListDto } from './dto/get-chat-message-list.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';
import { createId } from '@paralleldrive/cuid2';
import { Prisma } from '@b2b/database';
import { UpdateLastReadDto } from './dto/update-last-read.dto';

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
      const chatroomId = `c-${createId()}`;

      // 3-1. 새 채팅방 생성
      const newRoom = await tx.chatroom.create({
        data: {
          id: chatroomId,
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
        chatroomId: newRoom.id,
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
          chatroomId: room.id,
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
   * @param chatroomId - 참여하려는 채팅방 ID
   * @returns 채팅방 기본 정보 및 참여 성공 메시지
   * @throws
   * - {ForbiddenException} - 사용자가 워크스페이스에 가입하지 않은 경우
   * - {NotFoundException} - 채팅방이 존재하지 않는 경우
   * - {ConflictException} - 사용자가 이미 채팅방에 참여한 경우
   */
  async joinChatRoom(userId: string, workspaceId: string, chatroomId: string) {
    // 1. 사용자가 워크스페이스에 가입한 사용자인지 확인
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // 2. 채팅방 유효성 검사
    const chatRoom = await this.prisma.chatroom.findUnique({
      where: { id: chatroomId },
    });

    if (!chatRoom || chatRoom.workspaceId !== workspaceId) {
      throw new NotFoundException('해당하는 채팅방을 찾을 수 없습니다.');
    }

    // 3. 사용자가 이미 채팅방에 참여한 경우
    const isAlreadyMember = await this.prisma.chatroomMember.findFirst({
      where: { userId, chatroomId },
    });

    if (isAlreadyMember) {
      throw new ConflictException('이미 채팅방에 참여한 사용자입니다.');
    }

    // 4. 채팅방 참여 처리
    const newChatRoomMember = await this.prisma.chatroomMember.create({
      data: {
        chatroomId: chatroomId,
        userId: userId,
        workspaceId: workspaceId,
        role: 'MEMBER',
      },
    });

    // 5. 결과 반환
    return {
      message: '채팅방 참여 성공',
      chatroomId,
      title: chatRoom.title,
      role: newChatRoomMember.role,
      joinedAt: newChatRoomMember.joinedAt,
    };
  }

  /**
   * CHAT-ROOM-004
   * @description
   * - 채팅방 나가기
   * @param userId - 채팅방을 나가려는 사용자 ID
   * @param workspaceId - 나가려는 채팅방이 존재하는 워크스페이스 ID
   * @param chatroomId - 나가려는 채팅방 ID
   * @returns 채팅방 나가기 성공 메시지
   * @throws
   * - {BadRequestException} - 참여하지 않은 채팅방을 나가려고 하는 경우
   * - {NotFoundException} - 채팅방이 존재하지 않는 경우
   */
  async leaveChatRoom(userId: string, workspaceId: string, chatroomId: string) {
    // 1. 사용자 워크스페이스 멤버 여부 검사
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // 2. 사용자가 채팅방에 참여하고 있는지 확인
    const myMembership = await this.prisma.chatroomMember.findFirst({
      where: { userId, chatroomId },
    });

    if (!myMembership) {
      throw new BadRequestException('참여하지 않은 채팅방을 나가려고 합니다.');
    }

    // 3. 트랜잭션으로 분기에 따른 처리
    return this.prisma.$transaction(async (tx) => {
      // 3-1. ChatRoomMember Table에서 데이터 삭제
      await tx.chatroomMember.delete({
        where: {
          chatroomId_userId: { chatroomId: chatroomId, userId: userId },
        },
      });

      // 3-2. 해당 사용자가 나간 후 채팅방에 남은 사용자 수 계산
      // 비고: 단순 수치 계산이 아닌 nextOwner 로직에도 사용할 수 있으므로 count() 대신 findMany() 사용
      const remainingMembers = await tx.chatroomMember.findMany({
        where: { chatroomId },
        orderBy: { joinedAt: 'desc' },
      });

      // 3-A. 채팅방 이용자가 0명인 경우
      if (remainingMembers.length === 0) {
        await tx.chatroom.delete({
          where: { id: chatroomId },
        });

        return {
          message: '채팅방에 남은 사용자가 없어 자동 삭제 처리되었습니다.',
          chatroomId,
          leftAt: new Date(),
        };
      }

      // 3-B. 채팅방을 나간 사용자가 OWNER인 경우
      if (myMembership.role === 'OWNER') {
        // 3-B-1. joinedAt을 기준으로 합류 시점이 가장 오래된 사용자를 다음 OWNER 지정
        const nextOwner = remainingMembers[0];

        await tx.chatroomMember.update({
          where: {
            chatroomId_userId: {
              chatroomId: chatroomId,
              userId: nextOwner.userId,
            },
          },
          data: { role: 'OWNER' },
        });

        await tx.chatroom.update({
          where: { id: chatroomId },
          data: { updatedAt: new Date() },
        });

        return {
          message: '채팅방 나가기 완료, 자동으로 다음 OWNER를 지정했습니다.',
          chatroomId,
          leftAt: new Date(),
          nextOwnerId: nextOwner.userId,
        };
      }

      // 3-C. 일반적인 사용자가 나가기를 한 경우
      await tx.chatroom.update({
        where: {
          id: chatroomId,
        },
        data: { updatedAt: new Date() },
      });

      return {
        message: '채팅방 나가기 완료',
        chatroomId,
        leftAt: new Date(),
      };
    });
  }

  /**
   * CHAT-ROOM-005
   * @description
   * - 채팅방 OWNER 권한 위임
   * @param userId - 자신의 권한을 위임하려는 사용자 ID
   * @param workspaceId - 권한을 위임하려는 채팅방이 존재하는 워크스페이스 ID
   * @param chatroomId - 권한을 위임하려는 채팅방 ID
   * @param dto - 권한을 위임하려는 대상 사용자 ID가 담긴 Dto
   * @returns 채팅방 권한 위임 성공 메시지 및 데이터
   * @throws
   * - {BadRequestException} - 자기 자신에게 방장 권한을 위임하려는 경우
   * - {ForbiddenException} - 권한이 없는 사용자가 권한 위임을 시도하는 경우
   * - {NotFoundException} - 채팅방이 존재하지 않는 경우
   */
  async delegateChatRoomOwner(
    userId: string,
    workspaceId: string,
    chatroomId: string,
    dto: DelegateOwnerDto,
  ) {
    const { targetUserId } = dto;

    // 1. 자신에게 권한을 위임하려는 시도 차단
    if (userId === targetUserId) {
      throw new BadRequestException(
        '자기 자신에게 방장 권한을 위임할 수 없습니다.',
      );
    }

    // 2. 워크스페이스에 소속된 사용자 여부 검사
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // 3. 권한 위임 요청 사용자가 해당 채팅방의 OWNER인지 확인
    const myMembership = await this.prisma.chatroomMember.findUnique({
      where: {
        chatroomId_userId: {
          chatroomId,
          userId,
        },
      },
    });

    if (!myMembership || myMembership.role !== 'OWNER') {
      throw new ForbiddenException(
        '채팅방 OWNER 권한 위임을 위한 권한이 없습니다.',
      );
    }

    // 4. 권한을 위임받을 대상 사용자가 해당 채팅방에 소속되어 있는지 확인
    const targetMembership = await this.prisma.chatroomMember.findUnique({
      where: {
        chatroomId_userId: {
          chatroomId,
          userId: targetUserId,
        },
      },
    });

    if (!targetMembership) {
      throw new NotFoundException(
        '권한을 위임받을 대상자가 해당 채팅방에 소속되어 있지 않습니다.',
      );
    }

    // 5. 트랜잭션을 통해 원자성 보장
    return this.prisma.$transaction(async (tx) => {
      // 5-1. 대상 사용자를 OWNER 등급으로 승격
      await tx.chatroomMember.update({
        where: {
          chatroomId_userId: {
            chatroomId,
            userId: targetUserId,
          },
        },
        data: {
          role: 'OWNER',
        },
      });

      // 5-2. 기존 방장 (요청 사용자)을 MEMBER 등급으로 강등
      await tx.chatroomMember.update({
        where: {
          chatroomId_userId: {
            chatroomId,
            userId,
          },
        },
        data: {
          role: 'MEMBER',
        },
      });

      // 5-3. 채팅방 정보 갱신
      await tx.chatroom.update({
        where: { id: chatroomId },
        data: { updatedAt: new Date() },
      });

      // 5-4. 결과 반환
      return {
        message: '채팅방 방장 권한 위임 성공',
        chatroomId,
        previousOwnerId: userId,
        newOwnerId: targetUserId,
        updatedAt: new Date(),
      };
    });
  }

  /**
   * CHAT-CORE-001
   * @description
   * - 채팅 메시지 전송
   * @param userId - 송신자 ID
   * @param workspaceId - 송신자가 속한 워크스페이스 ID
   * @param chatroomId - 메시지를 전송할 채팅방 ID
   * @param dto - 메시지 전송에 필요한 DTO
   * @returns 메시지 전송 결과
   * @throws
   * - {BadRequestException} - 잘못된 메시지 형식
   * - {ForbiddenException} - 사용자가 해당 채팅방에 소속된 상태가 아닌 경우
   */
  async sendChatMessage(
    userId: string,
    workspaceId: string,
    chatroomId: string,
    dto: SendMessageDto,
  ) {
    const { type, content } = dto;

    // 1. 요청 사용자 워크스페이스 소속 여부 검증
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // TODO: Api v2 제작 시 채팅 관련 업데이트가 구조를 건들 지 않는 경우 해당 메서드 별도로 분리
    // 2. 요청 사용자 해당 채팅방 소속 여부 검증
    const isRoomMember = await this.prisma.chatroomMember.findUnique({
      where: {
        chatroomId_userId: {
          chatroomId,
          userId,
        },
      },
    });

    if (!isRoomMember) {
      throw new ForbiddenException(
        '해당 채팅방에 참여하고 있지 않아 메시지를 전송할 수 없습니다.',
      );
    }

    // 3. 트랜잭션으로 작업 처리
    return this.prisma.$transaction(async (tx) => {
      // 3-1. ChatMessage Table에 데이터 저장
      const newMessage = await tx.chatMessage.create({
        data: {
          id: `msg-${createId()}`,
          chatroomId,
          senderId: userId,
          type: type,
          content,
          isDeleted: false,
        },
      });

      // 3-2. Chatroom의 updatedAt 갱신
      await tx.chatroom.update({
        where: { id: chatroomId },
        data: {
          updatedAt: new Date(),
        },
      });

      // 3-3. 결과 반환
      return {
        message: '메시지 전송 성공',
        messageId: newMessage.id,
        chatroomId: newMessage.chatroomId,
        senderId: newMessage.senderId,
        type: newMessage.type,
        content: newMessage.content,
        createdAt: newMessage.createdAt,
      };
    });
  }

  /**
   * CHAT-CORE-002
   * @description
   * - 이전 메시지 내역 조회
   * @param userId - 요청 사용자 ID
   * @param workspaceId - 요청 사용자가 속한 워크스페이스 ID
   * @param chatroomId - 메시지 내역을 조회할 채팅방 ID
   * @param query - 커서 기반 페이징 정보가 담긴 DTO 객체
   * @returns 조회된 메시지 리스트 및 페이징 메타데이터
   * @throws
   * - {ForbiddenException} - 사용자가 해당 채팅방에 소속된 상태가 아닌 경우
   * - {NotFoundException} - 존재하지 않는 워크스페이스나 채팅방
   */
  async getChatMessageList(
    userId: string,
    workspaceId: string,
    chatroomId: string,
    query: GetChatMessageListDto,
  ) {
    const { cursor, limit = 64 } = query;

    // 1. 요청 사용자 워크스페이스 소속 여부 검증
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // 2. 요청 사용자 해당 채팅방 소속 여부 검증
    const isRoomMember = await this.prisma.chatroomMember.findUnique({
      where: {
        chatroomId_userId: {
          chatroomId,
          userId,
        },
      },
    });

    if (!isRoomMember) {
      throw new ForbiddenException(
        '해당 채팅방의 멤버가 아니므로 대화 내역을 조회할 수 없습니다.',
      );
    }

    // 3. 커서 기반 페이징용 WHERE 조건절 생성 (DeletedAt 제외)
    const whereClause: Prisma.ChatMessageWhereInput = {
      chatroomId,
      isDeleted: false,
    };

    const prismaQuery: Prisma.ChatMessageFindManyArgs = {
      where: whereClause,
      take: limit + 1,
      orderBy: {
        createdAt: 'desc',
      },
    };

    // 3-1. 클라이언트 측에서 cursor가 전달된 경우 cursor 이후 메시지 부터 조회
    if (cursor) {
      prismaQuery.cursor = { id: cursor };
      prismaQuery.skip = 1;
    }

    // 4. DB에서 과거 메시지 리스트 조회
    const messageList = await this.prisma.chatMessage.findMany(prismaQuery);

    // 5. hasNext 확인 및 nextCursor 연산 처리
    const hasNext = messageList.length > limit;
    const items = hasNext ? messageList.slice(0, limit) : messageList;

    // 5-1. 다음 스크롤 시 기준점이 될 nextCursor는 이번 조회 대상의 가장 마지막 메시지 ID
    const nextCursor =
      hasNext && items.length > 0 ? items[items.length - 1].id : null;

    // 6. 반환할 데이터 정제 (역순 정렬을 위해 reverse 사용)
    const formattedMessageList = items
      .map((msg) => {
        return {
          messageId: msg.id,
          chatroomId: msg.chatroomId,
          senderId: msg.senderId,
          type: msg.type,
          content: msg.content,
          createdAt: msg.createdAt,
        };
      })
      .reverse();

    // 7. 결과 반환
    return {
      message: '메시지 내역 조회 성공',
      nextCursor,
      hasNext,
      items: formattedMessageList,
    };
  }

  /**
   * CHAT-CORE-003
   * @description
   * - 채팅 메시지 수정
   * @param userId - 수정 요청 사용자 ID
   * @param workspaceId - 수정 요청 사용자가 속한 워크스페이스 ID
   * @param messageId - 수정할 메시지 고유 ID
   * @param dto - 메시지 수정에 필요한 DTO
   * @returns 메시지 수정 결과
   * @throws
   * - {ForbiddenException} - 메시지 작성자(senderId) 본인이 아닌 경우
   * - {NotFoundException} - 존재하지 않는 메시지이거나 이미 삭제된 경우
   */
  async updateChatMessage(
    userId: string,
    workspaceId: string,
    messageId: string,
    dto: UpdateChatMessageDto,
  ) {
    const { content } = dto;

    // 1. 요청 사용자 워크스페이스 소속 여부 검증
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // 2. 수정 대상 메시지 유효성 검증
    const message = await this.prisma.chatMessage.findUnique({
      where: { id: messageId },
    });

    if (!message || message.isDeleted) {
      throw new NotFoundException(
        '수정하려는 메시지가 존재하지 않거나 이미 삭제되었습니다.',
      );
    }

    // 3. 요청 사용자 본인 작성 메시지 여부 검사
    if (message.senderId !== userId) {
      throw new ForbiddenException(
        '본인이 작성한 메시지만 수정할 수 있는 권한이 있습니다.',
      );
    }

    // 4. 메시지 내용 교체 및 수정 여부 추가
    const updatedMessage = await this.prisma.chatMessage.update({
      where: { id: messageId },
      data: {
        content,
        isEdited: true,
      },
    });

    // 5. 결과 반환
    return {
      message: '메시지 수정 성공',
      messageId: updatedMessage.id,
      chatroomId: updatedMessage.chatroomId,
      senderId: updatedMessage.senderId,
      type: updatedMessage.type,
      content: updatedMessage.content,
      isEdited: updatedMessage.isEdited,
      updatedAt: updatedMessage.updatedAt,
    };
  }

  /**
   * CHAT-CORE-004
   * @description
   * - 채팅 메시지 삭제 (Soft Delete)
   * @url DELETE /workspace/:workspaceId/messages/:messageId
   */
  async deleteChatMessage(
    userId: string,
    workspaceId: string,
    messageId: string,
  ) {
    // 1. 요청 사용자 워크스페이스 소속 여부 검증
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // 2. 대상 메시지의 실존 여부 검사
    const message = await this.prisma.chatMessage.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      throw new NotFoundException('삭제하려는 메시지가 존재하지 않습니다.');
    }

    // 2-1. 이미 Soft Delete 처리된 경우 400 오류 발생
    if (message.isDeleted) {
      throw new BadRequestException('이미 삭제 처리 완료된 메시지입니다.');
    }

    // 3. 요청자 본인이 작성한 메시지 여부 검사
    if (message.senderId !== userId) {
      throw new ForbiddenException(
        '본인이 작성한 메시지만 삭제할 수 있는 권한이 있습니다.',
      );
    }

    // 4. isDeleted 상태 값 변경으로 Soft Delete 처리
    await this.prisma.chatMessage.update({
      where: { id: messageId },
      data: {
        isDeleted: true,
      },
    });

    // 5. 결과 반환
    return {
      message: '메시지 삭제 성공',
      messageId: message.id,
      chatroomId: message.chatroomId,
      isDeleted: true,
      deletedAt: new Date(),
    };
  }

  /**
   * CHAT-CORE-005
   * @description
   * - 채팅방 읽음 위치 처리
   * @url PUT /workspace/:workspaceId/channels/:chatroomId/read
   * @param userId - 요청 사용자 ID
   * @param workspaceId - 요청 사용자가 속한 워크스페이스 ID
   * @param chatroomId - 읽음 위치를 갱신할 채팅방 ID
   * @param dto - 마지막으로 확인한 메시지 ID가 담긴 DTO 객체
   * @returns 읽음 위치 저장 결과 메시지 및 갱신 시각
   * @throws
   * - {ForbiddenException} - 사용자가 해당 채팅방에 소속된 상태가 아닌 경우
   * - {NotFoundException} - 존재하지 않는 워크스페이스나 채팅방 멤버십
   */
  async updateLastReadMessage(
    userId: string,
    workspaceId: string,
    chatroomId: string,
    dto: UpdateLastReadDto,
  ) {
    const { lastReadMessageId } = dto;

    // 1. 요청 사용자 워크스페이스 소속 여부 검증
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // 2. 요청 사용자 해당 채팅방 소속 여부 검증
    const isRoomMember = await this.prisma.chatroomMember.findUnique({
      where: {
        chatroomId_userId: {
          chatroomId,
          userId,
        },
      },
    });

    if (!isRoomMember) {
      throw new ForbiddenException(
        '해당 채팅방의 멤버가 아니므로 읽음 위치를 마킹할 수 없습니다.',
      );
    }

    // 3. lastReadMessageId 필드 UPDATE
    await this.prisma.chatroomMember.update({
      where: {
        chatroomId_userId: {
          chatroomId,
          userId,
        },
      },
      data: {
        lastReadMessageId,
      },
    });

    // 4. 결과 반환
    return {
      message: '위치 저장 성공 메시지',
      chatroomId,
      userId,
      lastReadMessageId,
      updatedAt: new Date(),
    };
  }
}
