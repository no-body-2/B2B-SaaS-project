// apps/api/src/common/decorators/distributed-lock.decorator.ts

/**
 * Distributed Lock Decorator
 *
 * @description
 * - Redis를 사용하여 분산적 락 구현을 위한 데코레이터
 *
 * @author <nobody>
 * @date 2026-08-15
 */

import { applyDecorators, UseInterceptors, SetMetadata } from '@nestjs/common';
import { DistributedLockInterceptor } from '../interceptors/distributed-lock.interceptor';

export const LOCK_KEY_BUILDER = 'LOCK_KEY_BUILDER';
export const LOCK_TTL = 'LOCK_TTL';

/**
 * Distributed Lock Decorator
 *
 * @param keyBuilder 동적으로 락 Key를 생성하는 함수
 * @param ttlMs 락 유지 시간 (default: 5000ms)
 */
export function DistributedLock(
  keyBuilder: (args: any[]) => string,
  ttlMs: number = 5000,
) {
  return applyDecorators(
    SetMetadata(LOCK_KEY_BUILDER, keyBuilder),
    SetMetadata(LOCK_TTL, ttlMs),
    UseInterceptors(DistributedLockInterceptor),
  );
}
