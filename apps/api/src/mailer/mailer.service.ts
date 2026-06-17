// apps/api/src/mailer/mailer.service.ts

/**
 * Mailer Service
 * @description
 * - 타 모듈에서 메일 전송을 위임하여 사용할 서비스
 *
 * @author <nobody>
 * @date 2026-06-17
 */

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SendMailEvent } from './events/send-mail.event';

@Injectable()
export class MailerService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  /**
   * Send Welcome Mail
   * @description
   * - 회원가입 완료 시 환영 메일 발송
   */
  sendWelcomeMail(to: string, nickname: string) {
    this.eventEmitter.emit(
      'mail.send',
      new SendMailEvent(
        to,
        '[Nano Platform] 회원가입을 진심으로 환영합니다!',
        'WELCOME',
        { nickname },
      ),
    );
  }

  /**
   * Send Invitation Mail
   * @description
   * - 워크스페이스 초대장 메일 발송 위임
   */
  sendInvitationMail(to: string, workspaceName: string, inviteLink: string) {
    this.eventEmitter.emit(
      'mail.send',
      new SendMailEvent(
        to,
        `[Nano Platform] ${workspaceName} 워크스페이스에 초대되었습니다.`,
        'INVITATION',
        { workspaceName, inviteLink },
      ),
    );
  }

  /**
   * Send Reset Password Mail
   * @description
   * - 비밀번호 초기화 메일 발송
   */
  sendChangeEmailMail(to: string, resetLink: string) {
    this.eventEmitter.emit(
      'mail.send',
      new SendMailEvent(
        to,
        '[Nano Platform] 이메일 재설정 링크를 발송했습니다.',
        'CHANGE_EMAIL',
        { resetLink },
      ),
    );
  }
}
