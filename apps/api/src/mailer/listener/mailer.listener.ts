// apps/api/src/mailer/listener/mailer/listener.ts
// FIXME: SMTP Exception 535

/**
 * Mailer Event Listener
 * @description
 * - 이메일 관련 이벤트 제어
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

import { appConfig } from '../../common/config/app.config';

@Injectable()
export class MailerListener {
  private readonly logger = new Logger(MailerListener.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    const smtp = appConfig.smtp;
    this.transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
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

      const smtp = appConfig.smtp;
      const fromName = smtp.fromName;
      const fromEmail = smtp.fromEmail;

      const info = (await this.transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to,
        subject,
        html: htmlContent,
      })) as SentMessageInfo;

      // const info = (await this.transporter.sendMail({
      //   from: 'LumiNano Platform <no-reply@luminano.com>',
      //   to,
      //   subject,
      //   html: htmlContent,
      // })) as SentMessageInfo;

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
