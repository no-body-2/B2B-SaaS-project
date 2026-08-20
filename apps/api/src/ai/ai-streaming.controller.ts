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

import { Controller, Sse, Param, MessageEvent, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RedisService } from '../redis/redis.service';

@Controller('ai')
export class AiStreamingController {
  private readonly logger = new Logger(AiStreamingController.name);

  constructor(private readonly redisService: RedisService) {}

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
