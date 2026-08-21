// apps/api/src/common/interceptors/distributed-lock.interceptor.spec.ts

/**
 * Distributed Lock Interceptor Test
 *
 * @description
 * - DistributedLockInterceptor 단위 테스트
 *
 * @author <nobody>
 * @date 2026-08-15
 */

import { DistributedLockInterceptor } from './distributed-lock.interceptor';
import { Reflector } from '@nestjs/core';
import { RedisService } from '../../redis/redis.service';
import {
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { of } from 'rxjs';

describe('DistributedLockInterceptor Unit Test', () => {
  let interceptor: DistributedLockInterceptor;
  let reflectorMock: { get: jest.Mock };
  let redisServiceMock: {
    acquireLock: jest.Mock;
    releaseLock: jest.Mock;
  };
  let executionContextMock: Partial<ExecutionContext>;
  let callHandlerMock: Partial<CallHandler>;

  beforeEach(() => {
    reflectorMock = {
      get: jest.fn(),
    };

    redisServiceMock = {
      acquireLock: jest.fn(),
      releaseLock: jest.fn().mockResolvedValue(true),
    };

    interceptor = new DistributedLockInterceptor(
      reflectorMock as unknown as Reflector,
      redisServiceMock as unknown as RedisService,
    );

    executionContextMock = {
      getHandler: jest.fn(),
      getArgs: jest.fn().mockReturnValue([{ workspaceId: 'ws_123' }]),
    };

    callHandlerMock = {
      handle: jest.fn().mockReturnValue(of('success')),
    };
  });

  it('1. 락 획득 성공 시 비즈니스 로직을 실행하고 완료 후 락을 해제해야 한다.', (done) => {
    reflectorMock.get.mockImplementation((key) => {
      if (key === 'LOCK_KEY_BUILDER') {
        return (args: unknown[]) =>
          `lock:${(args[0] as { workspaceId: string }).workspaceId}`;
      }
      if (key === 'LOCK_TTL') return 5000;
      return null;
    });

    redisServiceMock.acquireLock.mockResolvedValue(true);
    redisServiceMock.releaseLock.mockResolvedValue(true);

    interceptor
      .intercept(
        executionContextMock as ExecutionContext,
        callHandlerMock as CallHandler,
      )
      .subscribe({
        next: (result) => {
          expect(result).toBe('success');
        },
        complete: () => {
          expect(redisServiceMock.acquireLock).toHaveBeenCalledWith(
            'lock:ws_123',
            expect.any(String),
            5000,
          );
          expect(redisServiceMock.releaseLock).toHaveBeenCalledWith(
            'lock:ws_123',
            expect.any(String),
          );
          done();
        },
      });
  });

  it('2. 락 획득 실패 시 ConflictException(409) 예외를 발생시켜야 한다.', (done) => {
    reflectorMock.get.mockImplementation((key) => {
      if (key === 'LOCK_KEY_BUILDER') {
        return (args: unknown[]) =>
          `lock:${(args[0] as { workspaceId: string }).workspaceId}`;
      }
      if (key === 'LOCK_TTL') return 5000;
      return null;
    });

    redisServiceMock.acquireLock.mockResolvedValue(false);

    interceptor
      .intercept(
        executionContextMock as ExecutionContext,
        callHandlerMock as CallHandler,
      )
      .subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(ConflictException);
          expect(err.message).toBe(
            '현재 다른 요청이 처리 중입니다. 잠시 후 다시 시도해 주세요.',
          );
          expect(redisServiceMock.releaseLock).not.toHaveBeenCalled();
          done();
        },
      });
  });
});
