// apps/api/src/common/breaker/circuit-breaker.service.ts

/**
 * Circuit Breaker Service
 *
 * @description
 * - Opossum Circuit Breaker
 * - API 문제 발생 시 전체 시스템 다운 방지를 위한 장치
 *
 * @author <nobody>
 * @date 2026-08-19
 */

import { Injectable, Logger } from '@nestjs/common';
import CircuitBreaker from 'opossum';

@Injectable()
export class CircuitBreakerService {
  private readonly logger = new Logger(CircuitBreakerService.name);

  // Opossum Circuit Breaker Instance 생성
  createBreaker<T, Args extends unknown[]>(
    action: (...args: Args) => Promise<T>,
    name: string,
  ): CircuitBreaker<Args, T> {
    const options: CircuitBreaker.Options = {
      timeout: 5000,
      errorThresholdPercentage: 50,
      resetTimeout: 10000,
    };

    const breaker = new CircuitBreaker<Args, T>(action, options);

    breaker.on('open', () => {
      this.logger.warn(
        `[CircuitBreaker] ${name} 서킷이 OPEN 되었습니다. (외부 API 요청 차단)`,
      );
    });

    breaker.on('close', () => {
      this.logger.log(
        `[CircuitBreaker] ${name} 서킷이 CLOSED 되었습니다. (정상 작동)`,
      );
    });

    breaker.on('halfOpen', () => {
      this.logger.log(
        `[CircuitBreaker] ${name} 서킷이 HALF-OPEN 상태입니다. (테스트 진행)`,
      );
    });

    return breaker;
  }
}
