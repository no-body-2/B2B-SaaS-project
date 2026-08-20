// apps/api/src/channel/websocket-gateway.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ChannelGateway } from './gateway/channel.gateway';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MessageType } from './dto/send-message.dto';

describe('WebSocket Gateway & Redis PubSub Unit Test', () => {
  let gateway: ChannelGateway;

  const mockRedisService = {
    publish: jest.fn().mockResolvedValue(1),
    subscribe: jest.fn(),
  };

  const mockPrismaService = {
    chatroomMember: {
      updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      count: jest.fn().mockResolvedValue(1),
    },
  };

  const mockJwtService = {
    verifyAsync: jest
      .fn()
      .mockResolvedValue({ sub: 'user-123', email: 'test@example.com' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelGateway,
        { provide: RedisService, useValue: mockRedisService },
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    gateway = module.get<ChannelGateway>(ChannelGateway);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('1. ChannelGateway 인스턴스가 올바르게 정의되어야 한다.', () => {
    expect(gateway).toBeDefined();
  });

  it('2. send_dm 이벤트 수신 시 Redis Pub/Sub 채널로 브로드캐스팅하고 ACK를 반환해야 한다.', async () => {
    const mockSocket = {
      id: 'socket-123',
      data: { userId: 'user-123' },
    } as any;

    const dto = {
      type: MessageType.TEXT,
      content: 'Hello World',
      receiverId: 'user-456',
      messageId: 'msg-789',
    };

    const ack = await gateway.handleSendDm(mockSocket, dto);
    expect(mockRedisService.publish).toHaveBeenCalledWith(
      'dm:room:user-456',
      expect.stringContaining('Hello World'),
    );
    expect(ack.event).toBe('send_dm_ack');
    expect(ack.data.status).toBe('SENT');
  });

  it('3. ack_message 이벤트 수신 시 마지막 읽은 메시지를 갱신하고 ACK를 반환해야 한다.', async () => {
    const mockSocket = {
      id: 'socket-123',
      data: { userId: 'user-123' },
    } as any;

    const dto = {
      chatroomId: 'room-1',
      lastReadMessageId: 'msg-999',
    };

    const ack = await gateway.handleAckMessage(mockSocket, dto);
    expect(mockPrismaService.chatroomMember.updateMany).toHaveBeenCalledWith({
      where: { chatroomId: 'room-1', userId: 'user-123' },
      data: { lastReadMessageId: 'msg-999' },
    });
    expect(ack.event).toBe('ack_response');
    expect(ack.data.success).toBe(true);
  });
});
