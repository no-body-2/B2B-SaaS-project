// apps/api/src/channel/channel.gateway.ts

/**
 * Channel Gateway
 * @description
 * WebSocket을 이용한 채팅 기능의 게이트웨이
 *
 * @author  <Nobody>
 * @date 2026-06-17
 */

import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { OnEvent } from '@nestjs/event-emitter';

interface JwtPayload {
  sub: string;
  email: string;
}

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: (
      requestOrigin: string,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ].filter(Boolean) as string[];
      if (
        !requestOrigin ||
        allowedOrigins.includes(requestOrigin) ||
        allowedOrigins.some((o) => requestOrigin.startsWith(o))
      ) {
        callback(null, true);
      } else {
        callback(new Error('CORS 연결 거부'));
      }
    },
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChannelGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChannelGateway.name);

  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Handle Connection
   * @description
   * - Client 측에서 Handshake 완료 후 커넥션이 생성되면 작동
   */
  async handleConnection(client: Socket) {
    try {
      const authHeader = (client.handshake.auth?.token ||
        client.handshake.headers?.authorization) as string | undefined;

      if (!authHeader) {
        this.logger.warn(
          `[WebSocket 연결 거부] Client ID: ${client.id} - 인증 토큰이 누락되었습니다.`,
        );
        client.disconnect(true);
        return;
      }

      // 2. Bearer 접두사 제거
      const token = authHeader.replace('Bearer ', '');

      // 3. 토큰 검증 및 복호화
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      })) as unknown as JwtPayload;

      // 4. 소켓 세션에 사용자 식별자 바인딩
      const socketData = client.data as { userId?: string; email?: string };
      socketData.userId = payload.sub;
      socketData.email = payload.email;

      // 5. 로깅
      this.logger.log(
        `[WebSocket 연결 성공] Client ID: ${client.id} 가 실시간 채팅 채널에 연결되었습니다.`,
      );
    } catch (err) {
      this.logger.warn(
        `[WebSocket 인증 실패] Client ID: ${client.id} 연결 차단 | 차단 사유: ${
          err instanceof Error ? err.message : '유효하지 않은 Access Token'
        }`,
      );
      client.disconnect(true);
    }
  }

  /**
   * Handle Disconnect
   * @description
   * - Client 측과의 연결 종료를 감지
   */
  handleDisconnect(client: Socket) {
    this.logger.log(
      `[WebSocket 연결 종료] Client ID: ${client.id} 가 실시간 채팅 채널에서 연결을 종료했습니다.`,
    );
  }

  /**
   * Handle JoinRoom
   * @description
   * - 클라이언트가 특정 채팅방 화면에 진입했을 때, 해당 방 ID 구획(Room)으로 소켓 인프라 설정
   * @event - joinRoom
   * @payload { chatroomId: string }
   */
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatroomId: string },
  ) {
    const { chatroomId } = data;
    const socketData = client.data as { userId?: string; email?: string };
    const userId = socketData.userId;

    if (!chatroomId) {
      client.emit('error', {
        message: '채팅방 식별 정보(chatroomId)가 유실되었습니다.',
      });
      return;
    }

    if (!userId) {
      client.emit('error', {
        message: '사용자 식별 정보가 유실되었습니다.',
      });
      client.disconnect(true);
      return;
    }

    const isRoomMember = await this.prisma.chatroomMember.count({
      where: {
        chatroomId,
        userId,
      },
    });

    if (isRoomMember === 0) {
      this.logger.warn(
        `[WebSocket 권한 위반 침입 감지] User ID: ${userId}가 권한이 없는 방(${chatroomId}) 입장을 시도함`,
      );
      client.emit('error', {
        message: '해당 채팅방에 접근할 권한이 없습니다.',
      });
      return;
    }

    // 1. 클라이언트 연결
    await client.join(chatroomId);

    this.logger.log(
      `[ChatRoom 합류 성공] Client ID: ${client.id} | ChatRoom ID: ${chatroomId}`,
    );

    // 2. 채팅방 입장 알림
    this.server.to(chatroomId).emit('joinedRoomNotice', {
      message: `새로운 사용자가 대화방에 합류했습니다.`,
      clientId: client.id,
      userId: userId,
    });
  }

  /**
   * Broadcast New Message
   * @description
   * - REST API 레이어에서 성공적으로 영속화된 메시지 객체를 해당 채팅방 전체에 실시간 브로드캐스팅
   * @param chatroomId - 대상 채팅방 ID
   * @param messagePayload - 프런트엔드가 수령할 메시지 스냅샷
   */
  broadcastNewMessage(chatroomId: string, messagePayload: any) {
    // 1. 신규 메시지 해당 채팅방 대상 전송
    this.server.to(chatroomId).emit('newMessage', messagePayload);

    this.logger.log(
      `[WS 브로드캐스트 완료] ChatRoom ID: ${chatroomId} -> 실시간 메시지 패킷 송출`,
    );
  }

  /**
   * Broadcast Update Message
   * @description
   * - 수정된 메시지를 채팅방 안의 유저들에게 실시간 전송
   * @param chatroomId - 대상 채팅방 ID
   * @param payload - 프런트엔드가 수령할 수정된 메시지 정보
   */
  broadcastUpdateMessage(chatroomId: string, payload: any) {
    this.server.to(chatroomId).emit('updateMessage', payload);
    this.logger.log(`[WS 송출] UpdateMessage -> ChatRoom: ${chatroomId}`);
  }

  /**
   * Broadcast Delete Message
   * @description
   * - Soft Delete된 메시지를 '삭제됨' 상태로 실시간 전송
   * @param chatroomId - 대상 채팅방 ID
   * @param payload - 프런트엔드가 수령할 삭제된 메시지 정보
   */
  broadcastDeleteMessage(chatroomId: string, payload: any) {
    this.server.to(chatroomId).emit('deleteMessage', payload);
    this.logger.log(`[WS 송출] DeleteMessage -> ChatRoom: ${chatroomId}`);
  }

  /**
   * Disconnect User Sockets
   * @description
   * - 특정 사용자가 강퇴(Kick)되었거나 소속이 해제되었을 때, 실시간 커넥션을 강제 종료시킵니다.
   * @param userId - 강퇴 대상 사용자 ID
   */
  disconnectUser(userId: string) {
    if (!this.server) return;
    try {
      const sockets = this.server.sockets.sockets;
      for (const [, socket] of sockets.entries()) {
        const socketData = socket.data as Record<string, any> | undefined;
        if (socketData && socketData.userId === userId) {
          socket.disconnect(true);
          this.logger.log(
            `[WS 연결 강제 해제] User ID: ${userId} 가 강퇴처리되어 연결이 해제되었습니다.`,
          );
        }
      }
    } catch (err) {
      this.logger.error('Failed to disconnect user sockets:', err);
    }
  }

  /**
   * Handle User Kicked Event
   * @description
   * - 이벤트 이미터를 통해 발행된 'user.kicked' 이벤트를 구독하여 소켓 강제 종료 수행
   */
  @OnEvent('user.kicked')
  handleUserKicked(payload: { userId: string }) {
    this.disconnectUser(payload.userId);
  }
}
