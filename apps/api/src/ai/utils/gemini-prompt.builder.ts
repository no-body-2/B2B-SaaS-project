// apps/api/src/ai/utils/gemini-prompt.builder.ts

/**
 * Gemini Prompt Builder & System Instruction Helper
 *
 * @description
 * - B2B SaaS 문서 유형별(기획서, 회의록, 보고서, 공지사항) 프롬프트 템플릿 생성
 * - 어조(Formal, Casual, Concise) 및 시스템 지침 캡슐화
 *
 * @author <nobody>
 * @date 2026-08-21
 */

export type DocumentPreset =
  | 'PROPOSAL'
  | 'MEETING_MINUTES'
  | 'REPORT'
  | 'ANNOUNCEMENT';
export type TonePreset = 'FORMAL' | 'CASUAL' | 'CONCISE';

export interface BuildPromptOptions {
  userPrompt: string;
  category?: DocumentPreset;
  tone?: TonePreset;
  customContext?: string;
}

export class GeminiPromptBuilder {
  private static readonly SYSTEM_INSTRUCTION = `
당신은 B2B SaaS 플랫폼 "Luminano"의 전문 비즈니스 문서 작성 전문 AI 어시스턴트입니다.
사용자가 제공한 요청 내용을 바탕으로 완성도 높고 명확한 Markdown 양식의 비즈니스 초안 문서를 작성합니다.

[기본 작성 규칙]
1. 문서 제목(# 제목)과 목차(##, ###) 구성을 명확히 분리하십시오.
2. 가독성을 위해 불릿 포인트(- )와 강조 구문(**강조**)을 적절히 활용하십시오.
3. 추측성 내용은 배제하고, 입력된 텍스트의 핵심 의도를 충실히 반영하십시오.
  `.trim();

  /**
   * 문서 유형별 프롬프트 템플릿 반환
   */
  private static getCategoryTemplate(category: DocumentPreset): string {
    switch (category) {
      case 'PROPOSAL':
        return `
[문서 유형: 기안서 / 사업 기획서]
다음 구조로 작성하십시오:
# [기안서 제목]
## 1. 추진 배경 및 목적
## 2. 주요 제안 내용
## 3. 소요 예산 및 자원
## 4. 기대 효과 및 향후 일정
        `.trim();

      case 'MEETING_MINUTES':
        return `
[문서 유형: 회의록]
다음 구조로 작성하십시오:
# [회의록 제목]
- **일시**: [일시 입력]
- **참석자**: [참석자 입력]
## 1. 주요 논의 안건
## 2. 결정 사항
## 3. 후속 조치 (Action Items)
        `.trim();

      case 'REPORT':
        return `
[문서 유형: 업무 보고서]
다음 구조로 작성하십시오:
# [업무 보고서 제목]
## 1. 금주 주요 추진 성과
## 2. 현안 및 장애 요소
## 3. 차주 주력 진행 계획
        `.trim();

      case 'ANNOUNCEMENT':
        return `
[문서 유형: 사내 공지사항]
다음 구조로 작성하십시오:
# [공지] [공지사항 제목]
## 1. 공지 목적 및 개요
## 2. 세부 안내 사항
## 3. 시행 일자 및 문의처
        `.trim();
    }
  }

  /**
   * 어조 스타일 지침 반환
   */
  private static getToneInstruction(tone: TonePreset): string {
    switch (tone) {
      case 'FORMAL':
        return '어조: 정중하고 격식 있는 비즈니스 경어체(~하십시오, ~입니다)를 사용하십시오.';
      case 'CASUAL':
        return '어조: 부드럽고 친근한 팀 협업체(~해요, ~했습니다)를 사용하십시오.';
      case 'CONCISE':
        return '어조: 명확하고 간결한 개조식 문체(~함, ~임, ~완료)를 사용하십시오.';
    }
  }

  /**
   * 최종 완성형 Gemini 입력 프롬프트 조립
   */
  public static build(options: BuildPromptOptions): {
    systemInstruction: string;
    finalPrompt: string;
  } {
    const category = options.category || 'PROPOSAL';
    const tone = options.tone || 'FORMAL';

    const categoryTemplate = this.getCategoryTemplate(category);
    const toneInstruction = this.getToneInstruction(tone);
    const contextPart = options.customContext
      ? `\n[참고 맥락 정보]\n${options.customContext}\n`
      : '';

    const finalPrompt = `
${categoryTemplate}

${toneInstruction}
${contextPart}
[사용자 요청 내용]
"${options.userPrompt}"

위 요청 내용을 바탕으로 완성도 높은 Markdown 비즈니스 초안 문서를 작성해 주십시오.
    `.trim();

    return {
      systemInstruction: this.SYSTEM_INSTRUCTION,
      finalPrompt,
    };
  }
}
