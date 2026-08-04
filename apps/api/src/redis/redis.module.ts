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
import { appConfig } from '../common/config/app.config';

// 자주 사용될 예정이므로 전역 모듈로 선언
@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const redisUrl = appConfig.redisUrl;
        if (!redisUrl) {
          console.warn(
            '[RedisModule] REDIS_URL이 설정되지 않았습니다. 로컬 127.0.0.1:6379로 연결을 시도합니다.',
          );
          return new Redis({
            host: '127.0.0.1',
            port: 6379,
            lazyConnect: true,
          });
        }
        return new Redis(redisUrl);
      },
    },
    RedisService,
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
