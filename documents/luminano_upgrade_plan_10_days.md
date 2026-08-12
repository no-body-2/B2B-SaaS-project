# Luminano 10 days Upgrade Plan

## 1. 개요 및 역할 분담 (R&R)
본 문서는 Luminano B2B SaaS 고도화 작업의 10일 이행 계획서입니다. 면접에서의 기술 주도권 확보를 위해 핵심 알고리즘은 개발자가 직접 작성하고, 보일러플레이트 코드 및 UI/인프라 설정은 AI가 자동 생성하여 10일 내에 전체 구축을 완수합니다.

### 개발자 (User) 담당 항목
- PII Envelope Encryption (AES-256-GCM) 및 HMAC-SHA256 Blind Index 알고리즘 구현
- ioredis 기반 원자적 Lua Script 분산 락 및 `@DistributedLock()` 키 생성 로직 구현
- 16진수 비트 연산 기반 Hierarchical Bitmask ACL 연산기 구현
- Lexicographical Fractional Indexing (`positionStr`) 문자열 연산 및 DFS 그래프 순환 검증 로직 구현
- Transactional Outbox Pattern 인터셉터 및 Relay 쿼리 구현
- k6 기반 1,000 VU 동시성 부하 테스트 직접 실행 및 검증

### AI 담당 항목
- PostgreSQL Prisma 스키마 확장 및 DDL 마이그레이션 실행
- NestJS DTO, Controller, ValidationPipe, Swagger 주석 자동 작성
- Next.js 웹 UI (Velog 마크다운 에디터, Naver Cafe형 탐색 UI) 구현
- Vitest 단위 테스트 스태폴딩 및 Mocking 환경 구성
- OpenTelemetry Collector, Docker Multi-stage, Kubernetes Helm 설정

---

## 2. 10일 일차별 개발 일정 및 세부 과제

### Day 1: 식별자 규격화 및 PII 보안 모듈
- 개발자: `CryptoService`의 AES-256-GCM 암복호화 및 HMAC-SHA256 Blind Index 생성기 구현
- AI: CUID2 접두사(`usr_`, `ws_`) TypeScript Brand Type 세팅 및 `User` DTO 파이프라인 구성
- 테스트: `apps/api/src/common/crypto/crypto.service.spec.ts`

### Day 2: 데이터베이스 스키마 마이그레이션 및 Outbox 패턴
- AI: Prisma 스키마 마이그레이션 DDL 실행 및 `OutboxEvent` 모델 생성
- 개발자: `TransactionalOutboxInterceptor` 및 DB 트랜잭션 연동 쿼리 작성
- 테스트: `apps/api/src/common/scheduler/outbox-relay.scheduler.spec.ts`

### Day 3: ioredis Redlock 분산 락 및 BullMQ 비동기 큐
- 개발자: `ioredis` 원자적 Lua 스크립트 작성 및 `@DistributedLock()` 키 빌더 구현
- AI: `BullMQ` 비동기 큐 모듈 및 AWS SES 메일 발송 워커 스태폴딩 구성
- 테스트: `apps/api/src/common/interceptors/distributed-lock.interceptor.spec.ts`

### Day 4: 계층형 Bitmask ACL 및 동적 정책 엔진
- 개발자: `READ(1) | WRITE(2) | DELETE(4) | ADMIN(8)` 비트 연산자 계산기 작성
- AI: Redis PubSub 권한 무효화 리스너 및 Strategy Pattern 기반 `WorkspacePolicyGuard` 구현
- 테스트: `apps/api/src/common/auth/bitmask-acl.spec.ts`

### Day 5: Naver Cafe형 커뮤니티 탐색 및 GIN 인덱스
- AI: PostgreSQL GIN Index (`tags`, `tsvector`) DDL 생성 및 탐색 UI 작성
- 개발자: 실명제/닉네임제 정책에 따른 유저 정보 마스킹 컨트롤러 구현
- 테스트: `apps/api/src/workspace/workspace-discovery.spec.ts`

### Day 6: Lexicographical Fractional Indexing D&D 트리
- 개발자: 두 문자열 사이의 중간값(`positionStr`) 계산 알고리즘 및 DFS 순환 검증 Guard 작성
- AI: Next.js Drag & Drop 트리 UI 컴포넌트 및 API 연결 구성
- 테스트: `apps/api/src/nano/utils/fractional-indexing.spec.ts`

### Day 7: Velog 마크다운 에디터 및 Hocuspocus Yjs 실시간 협업
- AI: Velog 스타일 MDX 에디터 프론트엔드 UI 및 S3 Direct Upload 구성
- 개발자: 백엔드 `@hocuspocus/server` WebSocket 커넥션 및 Yjs Document CRDT 로직 작성
- 테스트: `apps/api/src/nano/collaboration/hocuspocus.spec.ts`

### Day 8: BullMQ Gemini AI 초안 생성 및 SSE 스트리밍
- AI: BullMQ AI 워커 및 Opossum Circuit Breaker 래퍼 구성
- 개발자: NestJS `Observable` 기반 Server-Sent Events (SSE) 실시간 스트리밍 컨트롤러 구현
- 테스트: `apps/api/src/common/circuit-breaker/opossum.spec.ts`

### Day 9: WebSocket Gateway 및 Redis PubSub 실시간 DM
- AI: WebSocket DTO, 커넥션 가드 및 메신저 UI 화면 구현
- 개발자: Redis Pub/Sub Cluster 브로드캐스팅 및 메시지 수신 완료(ACK) 트랜잭션 작성
- 테스트: `apps/api/src/channel/websocket-gateway.spec.ts`

### Day 10: k6 부하 테스트, Vitest E2E 및 프로덕션 배포
- 개발자: k6 부하 테스트 스크립트 실행을 통한 1,000 VU 동시 결재/초청 락 검증
- AI: Vitest BDD 수트 실행, GitHub Actions CI/CD 작성 및 K8s Helm 배포
- 테스트: `apps/api/test/load/k6-concurrency-approval.js`, `apps/api/test/e2e/auth-workspace-nano.e2e-spec.ts`
