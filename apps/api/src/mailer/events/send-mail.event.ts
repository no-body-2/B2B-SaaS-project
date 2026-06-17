// apps/api/src/mailer/events/send-mailer.event.ts

/**
 * Send Mail Event
 * @description
 * - 이메일 전송 이벤트
 *
 * @author <nobody>
 * @date 2026-06-16
 */

export class SendMailEvent {
  constructor(
    public readonly to: string, // 메일 수신자
    public readonly subject: string, // 메일 제목
    public readonly template: 'WELCOME' | 'INVITATION' | 'CHANGE_EMAIL', // 메일 유형
    public readonly context: Record<string, any>, // 메일 유형에 따른 내용
  ) {}
}
