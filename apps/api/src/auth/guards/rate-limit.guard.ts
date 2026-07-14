import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(private readonly redisService: RedisService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const ip =
      request.ip ||
      (request.headers['x-forwarded-for'] as string) ||
      '127.0.0.1';
    const path = request.path;

    // IP와 경로 기준으로 제한 Key 생성 (예: ratelimit:127.0.0.1:/auth/login)
    const key = `ratelimit:${ip}:${path}`;

    // Redis INCR 수행하여 요청 횟수 증가
    const currentCount = await this.redisService.incr(key);

    // 처음 요청 시 TTL 60초 설정
    if (currentCount === 1) {
      await this.redisService.expire(key, 60);
    }

    // 분당 최대 15회 요청으로 제한
    const limit = 15;

    if (currentCount > limit) {
      throw new HttpException(
        '요청 횟수가 너무 많습니다. 1분 후에 다시 시도해 주세요.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
