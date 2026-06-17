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

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*', // TODO: 개발 중에만 * 사용, 배포 시 반드시 값을 지정할 것
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

  /**
   * Handle Connection
   * @description
   * - Client 측에서 Handshake 완료 후 커넥션이 생성되면 작동
   */
  // FIXME: client.id 타입 확인 후 Lint 에러 지울 것
  handleConnection(client: Socket) {
    this.logger.log(
      `[WebSocket 연결 성공] Client ID: ${client.id} 가 실시간 채팅 채널에 연결되었습니다.`,
    );
    // TODO: Access Token 검증부 추가
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

    if (!chatroomId) {
      client.emit('error', {
        message: '채팅방 식별 정보(chatroomId)가 유실되었습니다.',
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
}
