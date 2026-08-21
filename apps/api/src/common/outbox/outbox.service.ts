// apps/api/src/common/outbox/outbox.service.ts

/**
 * Outbox Pattern Service
 *
 * @description
 * - DB Transaction과 함께 Event를 저장하여 서비스에서 Event를 DB에 저장하는 시점에서
 * - 다른 인스턴스의 Event Handler가 해당 Event를 처리할 수 있도록 하는 서비스
 *
 * @author <nobody>
 * @date 2026-08-15
 */

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@luminano/database';

export interface CreateOutboxEventInput {
  aggregateType: string;
  aggregateId: string;
  eventType: string;
  payload: Prisma.InputJsonObject;
}

@Injectable()
export class OutboxService {
  private readonly logger = new Logger(OutboxService.name);

  constructor(private readonly prisma: PrismaService) {}

  // 단일 DB Transaction(tx) 내에서 Outbox 이벤트 생성
  async createOutboxEventInTx(
    tx: Prisma.TransactionClient,
    input: CreateOutboxEventInput,
  ) {
    const event = await tx.outboxEvent.create({
      data: {
        aggregateType: input.aggregateType,
        aggregateId: input.aggregateId,
        eventType: input.eventType,
        payload: input.payload,
        status: 'PENDING',
      },
    });

    this.logger.log(
      `[OutboxEvent Created] ID: ${event.id} | Type: ${event.eventType} | Aggregate: ${event.aggregateType}:${event.aggregateId}`,
    );

    return event;
  }
}
