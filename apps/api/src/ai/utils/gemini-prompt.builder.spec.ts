// apps/api/src/ai/utils/gemini-prompt.builder.spec.ts

import { GeminiPromptBuilder } from './gemini-prompt.builder';

describe('GeminiPromptBuilder (Unit Test)', () => {
  it('should build prompt for PROPOSAL with FORMAL tone', () => {
    const result = GeminiPromptBuilder.build({
      userPrompt: '신규 SaaS 사업 기획안을 작성해 줘',
      category: 'PROPOSAL',
      tone: 'FORMAL',
    });

    expect(result.systemInstruction).toContain('Luminano');
    expect(result.finalPrompt).toContain('기안서 / 사업 기획서');
    expect(result.finalPrompt).toContain('신규 SaaS 사업 기획안을 작성해 줘');
    expect(result.finalPrompt).toContain('경어체');
  });

  it('should build prompt for MEETING_MINUTES with CASUAL tone', () => {
    const result = GeminiPromptBuilder.build({
      userPrompt: '주간 팀 피드백 회의록 정리',
      category: 'MEETING_MINUTES',
      tone: 'CASUAL',
    });

    expect(result.finalPrompt).toContain('회의록');
    expect(result.finalPrompt).toContain('팀 협업체');
  });

  it('should include customContext when provided', () => {
    const result = GeminiPromptBuilder.build({
      userPrompt: '3분기 프로젝트 성과 보고서 작성',
      category: 'REPORT',
      tone: 'CONCISE',
      customContext: '목표 달성률 120% 달성 완료',
    });

    expect(result.finalPrompt).toContain('목표 달성률 120% 달성 완료');
    expect(result.finalPrompt).toContain('개조식');
  });
});
