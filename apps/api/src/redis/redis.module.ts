// apps/api/src/redis/redis.module.ts

/**
 * Redis Module
 *
 * @description
 * Backend에서 Redis 클라이언트를 제공하는 모듈
 *
 * @author  <Nobody>
 * @date 2026-05-19
 */

import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import Redis from 'ioredis';

// 자주 사용될 예정이므로 전역 모듈로 선언
@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const redisUrl = process.env.REDIS_URL;
        if (!redisUrl) {
          throw new Error('REDIS_URL 설정이 존재하지 않습니다.');
        }
        return new Redis(redisUrl);
      },
    },
    RedisService,
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
