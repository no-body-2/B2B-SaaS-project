// apps/api/src/analytics/tag-analytics.scheduler.spec.ts

/**
 * Tag Analytics Scheduler Unit Test (Multi-Node Safety & Chunking)
 *
 * @description
 * - Redis 분산 락 획득 실패 시 스킵 및 성공 시 청킹 업서트 검증
 *
 * @author <nobody>
 * @date 2026-08-17
 */

import { Test, TestingModule } from '@nestjs/testing';
import { TagAnalyticsScheduler } from './tag-analytics.scheduler';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

describe('TagAnalyticsScheduler Unit Test (Multi-Node Safety)', () => {
  let scheduler: TagAnalyticsScheduler;
  let redisService: RedisService;
  let prismaService: PrismaService;

  const mockRedisService = {
    acquireLock: jest.fn(),
    releaseLock: jest.fn(),
  };

  const mockPrismaService = {
    $queryRaw: jest.fn(),
    workspaceTagAnalytics: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagAnalyticsScheduler,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: RedisService, useValue: mockRedisService },
      ],
    }).compile();

    scheduler = module.get<TagAnalyticsScheduler>(TagAnalyticsScheduler);
    redisService = module.get<RedisService>(RedisService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('1. Redis 분산 락 획득 실패 시, 배치를 수행하지 않고 즉시 스킵해야 한다.', async () => {
    mockRedisService.acquireLock.mockResolvedValue(false);

    await scheduler.handleDailyTagAnalyticsBatch();

    expect(redisService.acquireLock).toHaveBeenCalledTimes(1);
    expect(prismaService.$queryRaw).not.toHaveBeenCalled();
  });

  it('2. Redis 분산 락 획득 성공 시, 청킹 업서트를 수행하고 배치가 끝나면 락을 해제해야 한다.', async () => {
    mockRedisService.acquireLock.mockResolvedValue(true);
    mockRedisService.releaseLock.mockResolvedValue(true);

    const mockRawResults = [
      { workspace_id: 'ws-1', tag: 'B2B', user_count: 5, nano_count: 12 },
    ];
    mockPrismaService.$queryRaw.mockResolvedValue(mockRawResults);
    mockPrismaService.workspaceTagAnalytics.findUnique.mockResolvedValue({
      userCount: 4,
    });
    mockPrismaService.workspaceTagAnalytics.upsert.mockResolvedValue({});

    await scheduler.handleDailyTagAnalyticsBatch();

    expect(redisService.acquireLock).toHaveBeenCalledTimes(1);
    expect(prismaService.$queryRaw).toHaveBeenCalledTimes(1);
    expect(prismaService.workspaceTagAnalytics.upsert).toHaveBeenCalledTimes(1);
    expect(redisService.releaseLock).toHaveBeenCalledTimes(1);
  });
});
