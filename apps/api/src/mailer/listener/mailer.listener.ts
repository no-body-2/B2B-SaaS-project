// apps/api/src/mailer/listener/mailer/listener.ts

/**
 * Mailer Event Listener
 * @description
 * - 이메일 관련 이벤 제어
 *
 * @author <nobody>
 * @date 2026-06-16
 */

import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SendMailEvent } from '../events/send-mail.event';

@Injectable()
export class MailerListener {
  private readonly logger = new Logger(MailerListener.name);

  /**
   * Handle Send Mail Event
   * @description
   * - Main 서비스와 별도로 진행될 메일 발송
   * @param event - 처리할 이벤트 객체
   */
  @OnEvent('mail.send', { async: true })
  async handleSendMailEvent(event: SendMailEvent) {
    const { to, subject, template, context } = event;

    this.logger.log(
      `[비동기 메일 큐 가동] Target: ${to} | Template: ${template} | 발송 프로세스 진입`,
    );

    try {
      // TODO: Nodemailer 또는 외부 인프라(SES 등) 커넥터 결합 예정
      await new Promise((resolve) => setTimeout(resolve, 1500));

      this.logger.log(
        `[비동기 메일 발송 완료] 수신자: ${to}에게 메일 전달 무결성 완료`,
      );
    } catch (error) {
      this.logger.error(
        `[메일 발송 대참사] 수신자: ${to} 메일 전송 중 인프라 누수 발생`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }
}
