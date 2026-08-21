// apps/api/src/common/scheduler/outbox-relay.scheduler.ts

/**
 * Outbox Relay Scheduler
 *
 * @description
 * - DB의 outbox_events 테이블에서 PENDING 상태인 이벤트를 주기적으로 조회
 * - 이벤트를 외부 메시지 브로커(또는 이벤트 핸들러)로 전달(Relay) 후 상태를 PROCESSED/FAILED로 업데이트
 *
 * @author <nobody>
 * @date 2026-08-15
 */

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { MailerService } from '../../mailer/mailer.service';
import { OutboxEvent } from '@luminano/database';

interface InvitationPayload {
  targetEmail?: string;
  invitationToken?: string;
  workspaceName?: string;
}

@Injectable()
export class OutboxRelayScheduler {
  private readonly logger = new Logger(OutboxRelayScheduler.name);
  private isProcessing = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  // 5초 주기로 PENDING 상태의 Outbox Event를 Relay 처리
  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleOutboxRelay() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      const pendingEvents = await this.prisma.outboxEvent.findMany({
        where: {
          status: 'PENDING',
          retryCount: { lt: 3 },
        },
        orderBy: { createdAt: 'asc' },
        take: 50,
      });

      if (pendingEvents.length === 0) {
        return;
      }

      this.logger.log(
        `[OutboxRelay] Processing ${pendingEvents.length} pending events...`,
      );

      for (const event of pendingEvents) {
        await this.processSingleEvent(event);
      }
    } catch (_err) {
      const errorMessage =
        _err instanceof Error ? _err.stack || _err.message : String(_err);
      this.logger.error(`[OutboxRelay Error] ${errorMessage}`);
    } finally {
      this.isProcessing = false;
    }
  }

  // 개별 이벤트의 핸들링 및 상태 업데이트
  private async processSingleEvent(event: OutboxEvent) {
    try {
      switch (event.eventType) {
        case 'INVITATION_CREATED': {
          const payload = event.payload as unknown as InvitationPayload;
          const targetEmail = payload?.targetEmail;
          const invitationToken = payload?.invitationToken;
          const workspaceName = payload?.workspaceName;

          if (targetEmail && workspaceName && invitationToken) {
            await this.mailerService.sendInvitationMail(
              targetEmail,
              workspaceName,
              invitationToken,
            );
          }
          break;
        }

        default:
          this.logger.warn(
            `[OutboxRelay] Unhandled eventType: ${event.eventType}`,
          );
          break;
      }

      // 성공 시 PROCESSED 상태로 업데이트
      await this.prisma.outboxEvent.update({
        where: { id: event.id },
        data: {
          status: 'PROCESSED',
          processedAt: new Date(),
        },
      });

      this.logger.log(
        `[OutboxRelay Success] Event ID ${event.id} marked as PROCESSED`,
      );
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error during event relay';
      const nextRetry = event.retryCount + 1;
      const isFailed = nextRetry >= 3;

      await this.prisma.outboxEvent.update({
        where: { id: event.id },
        data: {
          retryCount: nextRetry,
          status: isFailed ? 'FAILED' : 'PENDING',
          errorLog: errorMessage,
        },
      });

      this.logger.error(
        `[OutboxRelay Failed] Event ID ${event.id} | Retry: ${nextRetry}/3 | Error: ${errorMessage}`,
      );
    }
  }
}
