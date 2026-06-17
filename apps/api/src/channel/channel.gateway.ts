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
}
