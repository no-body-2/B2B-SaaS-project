// apps/api/src/mailer/templates/mail-template.factory.ts

/**
 * Mail Template Factory
 * @description 비동기 메일러 내부에서 사용할 HTML 마크업 템플릿을 전담 생성 및 분리 관리하는 정적 팩토리 클래스
 *
 * @author <Nobody>
 * @date 2026-06-16
 */

export class MailTemplateFactory {
  /**
   * createHtml
   * @description 템플릿 타입에 따라 동적 데이터(Context)를 바인딩하여 완성된 HTML 문자열을 반환
   */
  static createHtml(
    templateType: 'WELCOME' | 'INVITATION' | 'CHANGE_EMAIL',
    context: Record<string, any>,
  ): string {
    switch (templateType) {
      case 'INVITATION':
        return this.getInvitationTemplate(context);
      case 'WELCOME':
        return this.getWelcomeTemplate(context);
      case 'CHANGE_EMAIL':
        return this.getChangeEmailTemplate(context);
      default:
        return `<h3>Nano Platform</h3><p>요청하신 프로세스가 완료되었습니다.</p>`;
    }
  }

  private static getInvitationTemplate(context: Record<string, any>): string {
    return `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: 0 auto; border-radius: 8px;">
        <h2 style="color: #1e3a8a; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">워크스페이스 초대장이 도착했습니다.</h2>
        <p style="font-size: 15px; color: #334155; line-height: 1.6;">Nano B2B 플랫폼의 새로운 협업 공간에서 귀하를 초대했습니다.</p>
        <div style="margin: 35px 0; text-align: center;">
          <a href="${context.inviteLink}" style="background: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);">초대 수락하고 입장하기</a>
        </div>
        <p style="font-size: 13px; color: #64748b;">만약 요청하지 않은 초대라면 이 메일을 무시하셔도 안전합니다.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <small style="color: #94a3b8; display: block; text-align: center;">본 메일은 시스템에 의해 자동으로 발송된 비동기 메일입니다.</small>
      </div>
    `;
  }

  private static getWelcomeTemplate(context: Record<string, any>): string {
    return `
      <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2>회원가입을 진심으로 환영합니다!</h2>
        <p>${context.nickname}님, Nano 플랫폼의 다양한 기능을 이용해보세요!</p>
      </div>
    `;
  }

  private static getChangeEmailTemplate(context: Record<string, any>): string {
    return `
      <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2>이메일 재설정 안내</h2>
        <p>아래 링크를 통해 이메일 변경을 완료해 주세요.</p>
        <a href="${context.resetLink}">이메일 재설정하기</a>
      </div>
    `;
  }
}
