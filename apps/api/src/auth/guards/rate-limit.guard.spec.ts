import { RateLimitGuard } from './rate-limit.guard';
import { RedisService } from '../../redis/redis.service';
import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

describe('RateLimitGuard', () => {
  let guard: RateLimitGuard;
  let redisService: jest.Mocked<RedisService>;

  beforeEach(() => {
    redisService = {
      incr: jest.fn(),
      expire: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    } as any;

    guard = new RateLimitGuard(redisService);
  });

  const createMockContext = (ip: string, path: string): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          ip,
          path,
          headers: {},
        }),
      }),
    } as any;
  };

  it('should allow requests under the rate limit', async () => {
    redisService.incr.mockResolvedValue(1);
    redisService.expire.mockResolvedValue(1);

    const context = createMockContext('192.168.1.1', '/auth/login');
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(redisService.incr).toHaveBeenCalledWith(
      'ratelimit:192.168.1.1:/auth/login',
    );
    expect(redisService.expire).toHaveBeenCalledWith(
      'ratelimit:192.168.1.1:/auth/login',
      60,
    );
  });

  it('should not call expire if count is greater than 1', async () => {
    redisService.incr.mockResolvedValue(5);

    const context = createMockContext('192.168.1.1', '/auth/login');
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(redisService.incr).toHaveBeenCalledWith(
      'ratelimit:192.168.1.1:/auth/login',
    );
    expect(redisService.expire).not.toHaveBeenCalled();
  });

  it('should throw TooManyRequests exception if count exceeds the limit', async () => {
    redisService.incr.mockResolvedValue(16);

    const context = createMockContext('192.168.1.1', '/auth/login');

    await expect(guard.canActivate(context)).rejects.toThrow(
      new HttpException(
        '요청 횟수가 너무 많습니다. 1분 후에 다시 시도해 주세요.',
        HttpStatus.TOO_MANY_REQUESTS,
      ),
    );
  });

  it('should allow requests (Fail-Open) if Redis throws an error', async () => {
    redisService.incr.mockRejectedValue(new Error('Redis connection lost'));

    const context = createMockContext('192.168.1.1', '/auth/login');
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
  });
});
