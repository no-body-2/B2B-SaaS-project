// apps/api/src/common/interceptors/distributed-lock.interceptor.ts

/**
 * Distributed Lock Interceptor
 *
 * @description
 * - 분산 락 적용을 위한 인터셉터
 *
 * @author <nobody>
 * @date 2026-08-15
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, from } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';
import { RedisService } from '../../redis/redis.service';
import {
  LOCK_KEY_BUILDER,
  LOCK_TTL,
} from '../decorators/distributed-lock.decorator';

@Injectable()
export class DistributedLockInterceptor implements NestInterceptor {
  private readonly logger = new Logger(DistributedLockInterceptor.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const keyBuilder = this.reflector.get<(args: unknown[]) => string>(
      LOCK_KEY_BUILDER,
      context.getHandler(),
    );
    const ttlMs =
      this.reflector.get<number>(LOCK_TTL, context.getHandler()) || 5000;

    if (!keyBuilder) {
      return next.handle();
    }

    const args = context.getArgs();
    const lockKey = keyBuilder(args);
    const lockValue = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    return from(this.redisService.acquireLock(lockKey, lockValue, ttlMs)).pipe(
      mergeMap((acquired) => {
        if (!acquired) {
          throw new ConflictException(
            '현재 다른 요청이 처리 중입니다. 잠시 후 다시 시도해 주세요.',
          );
        }
        return next.handle().pipe(
          finalize(() => {
            void this.redisService
              .releaseLock(lockKey, lockValue)
              .catch((err: unknown) => {
                const errorMessage =
                  err instanceof Error ? err.message : String(err);
                this.logger.error(
                  `[DistributedLock] Failed to release lock ${lockKey}: ${errorMessage}`,
                );
              });
          }),
        );
      }),
    );
  }
}
