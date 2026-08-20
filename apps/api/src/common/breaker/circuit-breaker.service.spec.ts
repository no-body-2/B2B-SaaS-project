// apps/api/src/common/breaker/circuit-breaker.service.spec.ts

/**
 * Opossum Circuit Breaker Test Code
 *
 * @description
 * - Circuit Breaker Unit Test 코드
 *
 * @author <nobody>
 * @date 2026-08-20
 */

import { CircuitBreakerService } from './circuit-breaker.service';

describe('Opossum Circuit Breaker Unit Test', () => {
  let service: CircuitBreakerService;

  beforeEach(() => {
    service = new CircuitBreakerService();
  });

  it('1. 성공하는 비동기 함수 호출 시 CLOSED 상태를 유지해야 한다.', async () => {
    const successAction = jest.fn().mockResolvedValue('OK');
    const breaker = service.createBreaker(successAction, 'TestService');
    const result = await breaker.fire();
    expect(result).toBe('OK');
    expect(breaker.opened).toBe(false);
  });

  it('2. 지속적인 실패 시 서킷이 OPEN되어 Error를 빠른 차단(Fast-Fail) 해야 한다.', async () => {
    const failAction = jest.fn().mockRejectedValue(new Error('API Failure'));
    const breaker = service.createBreaker(failAction, 'FailService');

    // 에러 발생 유도
    for (let i = 0; i < 5; i++) {
      try {
        await breaker.fire();
      } catch (_err) {
        // 에러 무시
      }
    }

    expect(breaker.opened).toBe(true);
  });
});
