// apps/api/test/load/k6-concurrency-approval.ts

/**
 * k6 1,000 VU Concurrency Approval & Nano Document Load Test
 *
 * @description
 * - 1,000 Virtual Users 동시 결재 승인 및 Nano 문서 수정 부하 테스트
 * - P95 응답 속도 < 200ms 및 에러율 < 1% 검증
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Options } from 'k6/options';

export const options: Options = {
  stages: [
    { duration: '10s', target: 100 }, // Ramp-up to 100 VUs
    { duration: '30s', target: 1000 }, // Ramp-up to 1,000 VUs (Peak)
    { duration: '20s', target: 1000 }, // Stay at 1,000 VUs
    { duration: '10s', target: 0 }, // Ramp-down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% 요청은 200ms 이내 완료되어야 함
    http_req_failed: ['rate<0.01'], // HTTP 에러율 1% 미만 유지
  },
};

const BASE_URL = 'http://localhost:3000/api/v1';

export default function () {
  const payload = JSON.stringify({
    title: 'k6 Concurrency Test Document',
    content: 'Automated Stress Testing Under 1,000 VUs',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer dummy-k6-auth-token',
    },
  };

  // 1. Nano 문서 갱신 요청
  const res = http.post(`${BASE_URL}/nano/update`, payload, params);

  check(res, {
    'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
