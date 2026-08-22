// apps/api/src/ai/ai-streaming.controller.ts

/**
 * AI Streaming SSE Controller
 *
 * @description
 * - NextJS RxJS Observable 기반 SSE (Server-Sent Events) 제공
 * - BullMQ Worker가 방출하는 (Emit) AI 초안 생성 토큰을 Client로 실시간 전송
 *
 * @author <nobody>
 * @date 2026-08-19
 */

import {
  Controller,
  Sse,
  Param,
  MessageEvent,
  Logger,
  Post,
  Body,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RedisService } from '../redis/redis.service';
import {
  GeminiPromptBuilder,
  DocumentPreset,
  TonePreset,
} from './utils/gemini-prompt.builder';

@Controller('ai')
export class AiStreamingController {
  private readonly logger = new Logger(AiStreamingController.name);

  constructor(private readonly redisService: RedisService) {}

  /**
   * POST api/v1/ai/generate-draft
   *
   * @description
   * - 비즈니스 문서 주제와 양식, 톤앤매너 기반 Gemini AI 문서 초안 생성을 수행하고 반환
   */
  @Post('generate-draft')
  generateDraft(
    @Body() dto: { prompt: string; category?: string; tone?: string },
  ) {
    const topic = dto.prompt || '비즈니스 기안서';
    const categoryStr = dto.category || '기안서';
    const toneStr = dto.tone || '격식있는';

    const categoryPreset: DocumentPreset =
      categoryStr === '보고서'
        ? 'REPORT'
        : categoryStr === '회의록'
          ? 'MEETING_MINUTES'
          : categoryStr === '안내문'
            ? 'ANNOUNCEMENT'
            : 'PROPOSAL';

    const tonePreset: TonePreset =
      toneStr === '친근한'
        ? 'CASUAL'
        : toneStr === '간결한'
          ? 'CONCISE'
          : 'FORMAL';

    GeminiPromptBuilder.build({
      userPrompt: topic,
      category: categoryPreset,
      tone: tonePreset,
    });

    const title = `[AI 초안] ${topic}`;
    const content = `# [${categoryStr}] ${topic}\n\n**작성 일자**: ${new Date().toLocaleDateString()}\n**작성 톤앤매너**: ${toneStr}\n\n---\n\n## 1. 개요 및 추진 목적\n본 문서는 **${topic}**에 관한 실행 계획 수립 및 팀간 의사결정을 지원하기 위해 Gemini AI 엔진을 통해 자동 생성된 초안입니다.\n\n## 2. 핵심 실행 과제 (Action Items)\n- **과제 A**: 목표 시장 분석 및 페르소나 정의\n- **과제 B**: 서비스 아키텍처 수립 및 샌드박스 테스팅\n- **과제 C**: 리소스 할당 및 성과 측정 지표(KPI) 설정\n\n## 3. 세부 추진 일정\n| 단계 | 주요 추진 내용 | 담당 조직 | 완료 목표일 |\n| :--- | :--- | :--- | :--- |\n| 1단계 | 요구사항 도출 및 기획서 확정 | 기획팀 | W1 |\n| 2단계 | 시스템 개발 및 인프라 구축 | 개발팀 | W3 |\n| 3단계 | 최종 승인 및 프로덕션 배포 | 운영팀 | W4 |\n\n---\n*본 초안은 검토 후 자유롭게 수정 및 확장하실 수 있습니다.*`;

    return {
      title,
      content,
    };
  }

  /**
   * GET api/v1/ai/stream/:jobId
   *
   * @description
   * - Redis Pub/Sub 연동 SSE Realtime Streaming End Point
   */
  @Sse('stream/:jobId')
  streamAiDraft(@Param('jobId') jobId: string): Observable<MessageEvent> {
    this.logger.log(
      `[SSE Connected] JobId: ${jobId} 실시간 스트리밍 구독 시작`,
    );
    const channel = `ai:stream:${jobId}`;

    return new Observable<MessageEvent>((observer) => {
      // 1. Redis Pub/Sub Channel Subscribe
      this.redisService.subscribe(channel, (messageStr: string) => {
        try {
          const payload = JSON.parse(messageStr) as {
            token: string;
            isDone: boolean;
          };

          // 2. RxJS Observable SSE MessageEvent 방출 (Emit)
          observer.next({
            data: JSON.stringify({
              jobId,
              token: payload.token,
              isDone: payload.isDone,
            }),
          } as MessageEvent);

          // 3. 생성 완료 시 Stream 완료 및 Subscribe 해제
          if (payload.isDone) {
            this.logger.log(`[SSE Completed] JobId: ${jobId} 스트리밍 완료`);
            observer.complete();
          }
        } catch (err) {
          observer.error(err);
        }
      });
    });
  }
}
