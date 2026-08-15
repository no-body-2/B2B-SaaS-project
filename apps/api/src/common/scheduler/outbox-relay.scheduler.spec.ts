// apps/api/src/common/scheduler/outbox-relay.scheduler.spec.ts

/**
 * Outbox Relay Scheduler Test
 *
 * @description
 * - OutboxRelayScheduler의 PENDING 이벤트 릴레이 및 성공/실패 동작 단위 테스트
 *
 * @author <nobody>
 * @date 2026-08-15
 */

import { OutboxRelayScheduler } from './outbox-relay.scheduler';
import { PrismaService } from '../../prisma/prisma.service';
import { MailerService } from '../../mailer/mailer.service';
import { OutboxEvent } from '@luminano/database';

describe('OutboxRelayScheduler Unit Test', () => {
  let scheduler: OutboxRelayScheduler;
  let prismaMock: {
    outboxEvent: {
      findMany: jest.Mock;
      update: jest.Mock;
    };
  };
  let mailerMock: {
    sendInvitationMail: jest.Mock;
  };

  beforeEach(() => {
    prismaMock = {
      outboxEvent: {
        findMany: jest.fn(),
        update: jest.fn(),
      },
    };

    mailerMock = {
      sendInvitationMail: jest.fn(),
    };

    scheduler = new OutboxRelayScheduler(
      prismaMock as unknown as PrismaService,
      mailerMock as unknown as MailerService,
    );
  });

  it('1. PENDING 이벤트가 없을 경우 정상적으로 리턴되어야 한다.', async () => {
    prismaMock.outboxEvent.findMany.mockResolvedValue([]);

    await scheduler.handleOutboxRelay();

    expect(prismaMock.outboxEvent.findMany).toHaveBeenCalledTimes(1);
    expect(mailerMock.sendInvitationMail).not.toHaveBeenCalled();
  });

  it('2. PENDING 이벤트 처리 성공 시 status가 PROCESSED로 변경되어야 한다.', async () => {
    const mockEvent: Partial<OutboxEvent> = {
      id: 'out_123',
      eventType: 'INVITATION_CREATED',
      payload: {
        targetEmail: 'test@example.com',
        invitationToken: 'token123',
        workspaceName: 'Test Workspace',
      },
      retryCount: 0,
    };

    prismaMock.outboxEvent.findMany.mockResolvedValue([mockEvent]);
    prismaMock.outboxEvent.update.mockResolvedValue({
      ...mockEvent,
      status: 'PROCESSED',
    });

    await scheduler.handleOutboxRelay();

    expect(mailerMock.sendInvitationMail).toHaveBeenCalledWith(
      'test@example.com',
      'Test Workspace',
      'token123',
    );
    expect(prismaMock.outboxEvent.update).toHaveBeenCalledWith({
      where: { id: 'out_123' },
      data: expect.objectContaining({
        status: 'PROCESSED',
      }),
    });
  });

  it('3. 이메일 전송 실패 시 retryCount가 증가하고 PENDING 상태를 유지해야 한다.', async () => {
    const mockEvent: Partial<OutboxEvent> = {
      id: 'out_456',
      eventType: 'INVITATION_CREATED',
      payload: {
        targetEmail: 'fail@example.com',
        invitationToken: 'token456',
        workspaceName: 'Fail Workspace',
      },
      retryCount: 0,
    };

    prismaMock.outboxEvent.findMany.mockResolvedValue([mockEvent]);
    mailerMock.sendInvitationMail.mockImplementation(() => {
      throw new Error('SES Connection Failed');
    });

    await scheduler.handleOutboxRelay();

    expect(prismaMock.outboxEvent.update).toHaveBeenCalledWith({
      where: { id: 'out_456' },
      data: expect.objectContaining({
        retryCount: 1,
        status: 'PENDING',
        errorLog: 'SES Connection Failed',
      }),
    });
  });

  it('4. 3회 실패 시 status가 FAILED로 변경되어야 한다.', async () => {
    const mockEvent: Partial<OutboxEvent> = {
      id: 'out_789',
      eventType: 'INVITATION_CREATED',
      payload: {
        targetEmail: 'fail@example.com',
        invitationToken: 'token789',
        workspaceName: 'Fail Workspace',
      },
      retryCount: 2,
    };

    prismaMock.outboxEvent.findMany.mockResolvedValue([mockEvent]);
    mailerMock.sendInvitationMail.mockImplementation(() => {
      throw new Error('SES Connection Failed');
    });

    await scheduler.handleOutboxRelay();

    expect(prismaMock.outboxEvent.update).toHaveBeenCalledWith({
      where: { id: 'out_789' },
      data: expect.objectContaining({
        retryCount: 3,
        status: 'FAILED',
        errorLog: 'SES Connection Failed',
      }),
    });
  });
});
