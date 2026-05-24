// apps/api/src/redis/redis.service.ts

/**
 * Global Redis Service
 * @description
 * - 분산 세션 관리, 쿨다운 어뷰징 방어 등을 위한 전역 Redis 서비스
 *
 * @author  <Nobody>
 * @date 2026-05-24
 */

import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  /**
   * Redis Key 데이터 조회
   * @param key - 조회할 Redis Key
   * @returns Redis Key에 해당하는 데이터
   */
  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  /**
   * Redis Key-Value 저장 (TTL 포함)
   * @Param key - 저장 대상 고유 식별자
   * @param value - 저장할 데이터 문자열 (JSON.stringfy 처리 필요)
   * @param ttlSeconds - 만료 시간
   */
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    // ttlSeconds 설정의 유무에 따라 Redis에 데이터 저장
    if (ttlSeconds) {
      await this.redisClient.set(key, value, 'EX', ttlSeconds);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  /**
   * Redis Key 제거
   * @param key - 제거 대상 Key
   */
  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  // Application 종료 시 Redis 커넥션 종료
  onModuleDestroy() {
    this.redisClient.disconnect();
  }
}
