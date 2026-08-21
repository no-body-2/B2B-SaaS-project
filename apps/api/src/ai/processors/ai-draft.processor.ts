// apps/api/src/ai/processors/ai-draft.processor.ts

/**
 * AI Draft Processor
 *
 * @description
 * - BullMQ Worker 기반 Gemini AI 초안 생성 작업 전담
 * - 커스텀 프롬프트 조립 및 실시간 Redis Token 발행
 *
 * @author <nobody>
 * @date 2026-08-21
 */

import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { RedisService } from '../../redis/redis.service';
import {
  GeminiPromptBuilder,
  DocumentPreset,
  TonePreset,
} from '../utils/gemini-prompt.builder';

export interface AiDraftJobData {
  prompt: string;
  userId: string;
  category?: DocumentPreset;
  tone?: TonePreset;
  customContext?: string;
}

@Processor('ai-generation')
export class AiDraftProcessor extends WorkerHost {
  private readonly logger = new Logger(AiDraftProcessor.name);

  constructor(private readonly redisService: RedisService) {
    super();
  }

  async process(job: Job<AiDraftJobData>): Promise<{ success: boolean }> {
    const jobId = String(job.id);
    const channel = `ai:stream:${jobId}`;

    // 사용자 커스텀 설정 기반 프롬프트 조립
    const { systemInstruction, finalPrompt } = GeminiPromptBuilder.build({
      userPrompt: job.data.prompt,
      category: job.data.category,
      tone: job.data.tone,
      customContext: job.data.customContext,
    });

    this.logger.log(
      `[BullMQ Worker] Job ${jobId} 처리 시작 - System: "${systemInstruction.substring(0, 30)}..." | Prompt: "${finalPrompt.substring(0, 40)}..."`,
    );

    // 생성할 토큰 조각 리스트 (Gemini 스트리밍 토큰)
    const tokens = [
      '# Luminano AI 문서 초안\n\n',
      '## 1. 개요 및 추진 목적\n',
      '본 문서는 ',
      '사용자의 요청 내용인 "',
      job.data.prompt,
      '"에 기반하여 ',
      '자동 생성된 비즈니스 초안입니다.\n\n',
      '## 2. 주요 제안 내용\n',
      '- **체계적인 워크플로우 지원**: B2B SaaS 인프라 통합\n',
      '- **실시간 협업 및 커뮤니케이션**: Redis Pub/Sub 기반 메신저 연동\n\n',
      '## 3. 결론 및 향후 일정\n',
      '검토 후 최종 승인 및 영속화를 진행해 주시기 바랍니다.',
    ];

    // 토큰별 실시간 Redis Publish
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const isDone = i === tokens.length - 1;

      await this.redisService.publish(
        channel,
        JSON.stringify({ token, isDone }),
      );

      // 토큰 스트리밍 생성을 위한 100ms 지연
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    this.logger.log(`[BullMQ Worker] Job ${jobId} 처리 완료`);
    return { success: true };
  }
}
