// apps/api/src/ai/processor/ai-draft.processor.ts

/**
 * AI Draft Processor
 *
 * @description
 * - BullMQ Worker 기반 AI 초안 생성 작업 전담
 * - Redis Token 발행
 *
 * @author <nobody>
 * @date 2026-08-19
 */

import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { RedisService } from '../../redis/redis.service';

export interface AiDraftJobData {
  prompt: string;
  userId: string;
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
    this.logger.log(
      `[BullMQ Worker] Job ${jobId} 처리 시작 - Prompt: "${job.data.prompt}"`,
    );

    // 생성할 토큰 조각 리스트
    // TODO:(Gemini API Stream 연동 예정)
    const tokens = [
      '안녕하세요. ',
      '사회적 ',
      'ㅈㅇㅎ ',
      '클럽의 ',
      'LumiNano ',
      '서비스 ',
      '일까요?',
    ];

    // 토큰별 실시간 Redis Publish
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const isDone = i === tokens.length - 1;

      await this.redisService.publish(
        channel,
        JSON.stringify({ token, isDone }),
      );

      // 토큰 생성을 위한 150ms 지연
      await new Promise((resolve) => setTimeout(resolve, 150));
    }

    this.logger.log(`[BullMQ Worker] Job ${jobId} 처리 완료`);
    return { success: true };
  }
}
