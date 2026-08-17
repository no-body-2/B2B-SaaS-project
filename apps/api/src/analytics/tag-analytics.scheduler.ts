// apps/api/src/analytics/tag-analytics.scheduler.ts

/**
 * Tag Analytics Batch Scheduler
 *
 * @description
 * - Multi-Node Lock & Chunking Version
 * - 매일 자정에 실행
 * - Redis 분산 락을 통하여 다중 인스턴스 중복 실행 방지
 *
 * @author <nobody>
 * @date 2026-08-17
 */

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

interface TagStatsRawResult {
  workspace_id: string;
  tag: string;
  user_count: number;
  nano_count: number;
}

@Injectable()
export class TagAnalyticsScheduler {
  private readonly logger = new Logger(TagAnalyticsScheduler.name);
  private readonly lockKey = 'lock:batch:tag-analytics';
  private readonly lockTtlMs = 300000; // 5 minutes
  private readonly chunkSize = 100;

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  // 매일 자정, 태그 통계 집계 실행
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailyTagAnalyticsBatch(): Promise<void> {
    const lockValue = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // 1. Redis 분산 락 획득
    const acquired = await this.redisService.acquireLock(
      this.lockKey,
      lockValue,
      this.lockTtlMs,
    );

    if (!acquired) {
      this.logger.warn(
        '[TagAnalyticsBatch] 다른 인스턴스에서 배치가 진행 중이므로 작업을 스킵합니다.',
      );
      return;
    }

    this.logger.log(
      '[TagAnalyticsBatch] 분산 락 획득 완료, 야간 태그 통계 작업 시작...',
    );

    try {
      // 2. raw query로 Workspace Tag 별 Member 수 및 Nano 수 집계
      const rawResults = await this.prisma.$queryRaw<TagStatsRawResult[]>`
        SELECT 
          w.id AS workspace_id,
          t.tag,
          COUNT(DISTINCT wm.user_id)::int AS user_count,
          COUNT(DISTINCT n.id)::int AS nano_count
        FROM workspaces w
        CROSS JOIN UNNEST(w.tags) AS t(tag)
        LEFT JOIN workspace_members wm ON wm.workspace_id = w.id
        LEFT JOIN nanos n ON n.workspace_id = w.id
        GROUP BY w.id, t.tag;
      `;

      this.logger.log(
        `[TagAnalyticsBatch] 총 ${rawResults.length} 건의 데이터 계산 완료`,
      );

      // 3. 100개 단위 청크 분할 UPSERT 처리
      for (let i = 0; i < rawResults.length; i += this.chunkSize) {
        const chunk = rawResults.slice(i, i + this.chunkSize);
        await this.processChunk(chunk);
      }

      this.logger.log('[TagAnalyticsBatch] 야간 태그 통계 정상 완료');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(
        `[TagAnalyticsBatch] 야간 태그 통계 실패: ${errorMessage}`,
      );
    } finally {
      // 4. 락 해제 (finally 블록에서 반드시 실행)
      await this.redisService
        .releaseLock(this.lockKey, lockValue)
        .catch(() => {});
    }
  }

  // 청크 단위 Upsert 및 성장률 계산
  private async processChunk(chunk: TagStatsRawResult[]): Promise<void> {
    for (const item of chunk) {
      const currentUserCount = Number(item.user_count) || 0;
      const currentNanoCount = Number(item.nano_count) || 0;

      // 기본 저장 데이터 조회 (성장률 계산용)
      const prevRecord = (await this.prisma.workspaceTagAnalytics.findUnique({
        where: {
          workspaceId_tag: {
            workspaceId: item.workspace_id,
            tag: item.tag,
          },
        },
      })) as { userCount: number } | null;

      const prevUserCount = prevRecord?.userCount ?? 0;
      const growthRate =
        prevUserCount > 0
          ? Number(
              (
                ((currentUserCount - prevUserCount) / prevUserCount) *
                100
              ).toFixed(1),
            )
          : 0.0;
      const isHyped = growthRate >= 20.0 || currentUserCount >= 10;

      await this.prisma.workspaceTagAnalytics.upsert({
        where: {
          workspaceId_tag: {
            workspaceId: item.workspace_id,
            tag: item.tag,
          },
        },
        update: {
          userCount: currentUserCount,
          nanoCount: currentNanoCount,
          growthRate,
          isHyped,
        },
        create: {
          workspaceId: item.workspace_id,
          tag: item.tag,
          userCount: currentUserCount,
          nanoCount: currentNanoCount,
          growthRate,
          isHyped,
        },
      });
    }
  }
}
