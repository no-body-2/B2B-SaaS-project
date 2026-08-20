// apps/api/src/channel/gateway/channel.gateway.ts

/**
 * Channel Gateway
 *
 * @description
 * - Redis Pub/Sub 연동 멀티 노드 분산 실시간 메신저 Gateway
 * - Socket Room 관리 및 ACK 트랜잭션 이벤트 처리
 *
 * @author <nobody>
 * @date 2026-08-20
 */

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { appConfig } from '../../common/config/app.config';
import { SendMessageDto } from '../dto/send-message.dto';
import { UpdateLastReadDto } from '../dto/update-last-read.dto';

interface JwtPayload {
  sub: string;
  email: string;
}

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*',
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
    private readonly redisService: RedisService,
  ) {}

  // 1. WebSocket 초기 커넥션 인증 핸들러 (Handshake JWT Verification)
  async handleConnection(client: Socket) {
    try {
      let token: string | null = null;
      let isCookieAuth = false;

      // 1-1. Cookie에서 Token 추출 시도
      if (client.handshake.headers?.cookie) {
        const match = client.handshake.headers.cookie.match(
          /(^|;)\s*refreshToken\s*=\s*([^;]+)/,
        );
        if (match) {
          token = decodeURIComponent(match[2]);
          isCookieAuth = true;
        }
      }

      // 1-2. Cookie에서 Token을 찾을 수 없는 경우 Auth/Headers에서 추출 시도
      if (!token) {
        const authHeader = (client.handshake.auth?.token ||
          client.handshake.headers?.authorization) as string | undefined;
        if (authHeader) {
          token = authHeader.replace('Bearer ', '');
        }
      }

      // 1-3. Cookie 및 Auth/Headers 두 곳에서 Token을 찾을 수 없는 경우 연결 거부
      if (!token) {
        this.logger.warn(`[WS 연결 거부] Client ID: ${client.id} - Token 없음`);
        client.disconnect(true);
        return;
      }

      // 1-4. Token 검증
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: isCookieAuth
          ? appConfig.jwtRefreshSecret
          : appConfig.jwtAccessSecret,
      })) as unknown as JwtPayload;

      // 1-5. Socket Session Data Binding (세션 정보 바인딩)
      const socketData = client.data as { userId?: string; email?: string };
      socketData.userId = payload.sub;
      socketData.email = payload.email;

      this.logger.log(
        `[WS 연결 성공] Client ID: ${client.id} | User ID: ${payload.sub}`,
      );
    } catch (_err) {
      this.logger.warn(`[WS 인증 실패] Client ID: ${client.id} 연결 차단`);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`[WS 연결 종료] Client ID: ${client.id}`);
  }

  // 2. Direct Message Send Event (DM 전송 이벤트) - Redis Pub/Sub Multi Node Broadcasting
  @SubscribeMessage('send_dm')
  async handleSendDm(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: SendMessageDto & {
      receiverId: string;
      messageId: string;
    },
  ) {
    const socketData = client.data as { userId?: string };
    const senderId = socketData.userId || 'anonymous';
    const channelName = `dm:room:${data.receiverId}`;

    this.logger.log(
      `[DM Sent] Sender: ${senderId} -> Receiver: ${data.receiverId}`,
    );

    // Redis Pub/Sub 멀티 파드 전체 브로드캐스팅
    await this.redisService.publish(
      channelName,
      JSON.stringify({
        messageId: data.messageId,
        senderId,
        content: data.content,
        type: data.type,
        createdAt: new Date().toISOString(),
      }),
    );

    return {
      event: 'send_dm_ack',
      data: { status: 'SENT', messageId: data.messageId },
    };
  }

  // 3. 수신 완료 / 읽음 처리 ACK 이벤트 (`ack_message`)
  @SubscribeMessage('ack_message')
  async handleAckMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: UpdateLastReadDto & {
      chatroomId: string;
    },
  ) {
    const socketData = client.data as { userId?: string };
    const userId = socketData.userId;

    this.logger.log(
      `[ACK Message] User ${userId} read ${data.lastReadMessageId}`,
    );

    if (userId && data.chatroomId && data.lastReadMessageId) {
      await this.prisma.chatroomMember.updateMany({
        where: { chatroomId: data.chatroomId, userId },
        data: { lastReadMessageId: data.lastReadMessageId },
      });
    }

    return {
      event: 'ack_response',
      data: { success: true, lastReadMessageId: data.lastReadMessageId },
    };
  }

  /**
   * Broadcast New Message
   */
  broadcastNewMessage(chatroomId: string, messagePayload: unknown) {
    if (!this.server) return;
    this.server.to(chatroomId).emit('newMessage', messagePayload);
  }

  /**
   * Broadcast Update Message
   */
  broadcastUpdateMessage(chatroomId: string, payload: unknown) {
    if (!this.server) return;
    this.server.to(chatroomId).emit('updateMessage', payload);
  }

  /**
   * Broadcast Delete Message
   */
  broadcastDeleteMessage(chatroomId: string, payload: unknown) {
    if (!this.server) return;
    this.server.to(chatroomId).emit('deleteMessage', payload);
  }

  /**
   * Disconnect User
   */
  disconnectUser(userId: string) {
    if (!this.server) return;
    try {
      const sockets = this.server.sockets.sockets;
      for (const [, socket] of sockets.entries()) {
        const socketData = socket.data as Record<string, unknown> | undefined;
        if (socketData && socketData.userId === userId) {
          socket.disconnect(true);
        }
      }
    } catch (_err) {
      this.logger.error('Failed to disconnect user sockets');
    }
  }
}
