// apps/api/src/mailer/listener/mailer/listener.ts
// FIXME: SMTP Exception 535

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
import * as nodemailer from 'nodemailer';
import { MailTemplateFactory } from '../template/mail-template.factory';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailerListener {
  private readonly logger = new Logger(MailerListener.name);
  private transporter: nodemailer.Transporter;

  // TODO: 임시 값으로 설정해 둔 상태 -> 실제 값으로 변경할 것 -> Mail Service 에서 자체 도메인 Email 생성 및 연동 후 .env 파일로 값 안정성 보장
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'user@example.com',
        pass: 'password',
      },
    });
  }

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
      `[Mail Queue 가동] 수신: ${to} | 템플릿: ${template} | SMTP 전송`,
    );

    try {
      const htmlContent = MailTemplateFactory.createHtml(template, context);

      const info = (await this.transporter.sendMail({
        from: 'Nano Platform <noreply@nano.com>',
        to,
        subject,
        html: htmlContent,
      })) as SentMessageInfo;

      this.logger.log(
        `[Mail 발송 완료] Message ID: ${info.messageId} | 미리보기: ${nodemailer.getTestMessageUrl(info)}`,
      );
    } catch (err) {
      this.logger.error(
        `[Mail 발송 실패] 수신: ${to} 에게 메일 전송 실패`,
        err instanceof Error ? err.stack : undefined,
      );
    }
  }
}
