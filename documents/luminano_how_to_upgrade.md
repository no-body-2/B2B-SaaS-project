# Luminano Upgrade Plan

## 1. 개요 및 전체 구성
본 명세서는 Luminano B2B SaaS 시스템의 전체 아키텍처 및 세부 기술 사양서입니다. 11가지 비즈니스 구상 기능, 7가지 엔터프라이즈 코어 결함 보완 요소, 그리고 8가지 하이퍼스케일 기술 과제를 명확한 사양과 스키마, 소스 코드로 명시합니다.

---

## 2. 26대 통합 아키텍처 명세 목록

### 2.1. 비즈니스 기능 사양 (11대 과제)
1. **Drag & Drop Nano 트리**: `positionStr` 문자열 기반 Lexicographical Fractional Indexing 및 DFS 그래프 순환 검증 Guard 적용.
2. **권한 체계 개편**: 계층형 Bitmask ACL (`READ`, `WRITE`, `DELETE`, `ADMIN`) 적용 및 Redis PubSub 캐시 무효화 연동.
3. **Nano 에디터 고도화**: Velog 스타일 MDX 에디터 및 S3 Direct Upload 구성 + Hocuspocus Yjs CRDT 실시간 협업 에디터 연동.
4. **Naver Cafe형 커뮤니티 탐색**: `Workspace.tags` PostgreSQL GIN Index 및 `tsvector` 전색 검색 기반 탐색 인덱싱.
5. **사용자 프로필 확장**: `bio` 상태 메시지 추가 및 PII(전화번호 등) AES-256-GCM 암호화 및 HMAC-SHA256 Blind Index 생성.
6. **워크스페이스 동적 정책 엔진**: `WorkspacePolicy` 엔티티 분리 및 Strategy Pattern 기반 `WorkspacePolicyGuard` 구현.
7. **원격 로그 수집 체계**: Vector Sidecar 에이전트 + OpenSearch / Grafana Loki 실시간 모니터링 연동.
8. **CUID 식별자 규격화**: Stripe 형태의 `usr_`, `ws_`, `nano_`, `msg_`, `out_` CUID2 식별자 및 TypeScript Brand Type 적용.
9. **Gemini AI 자동 초안 생성**: BullMQ 비동기 AI 워커 큐 + NestJS SSE(Server-Sent Events) 타이핑 스트리밍 구현.
10. **MVP Production 리팩토링**: 전역 RFC 7807 ExceptionFilter, TransformInterceptor, `Idempotency-Key` 검증 레이어 구축.
11. **내장 메신저 및 알림**: NestJS WebSockets Gateway + Redis Cluster PubSub Adapter 기반 1:1 DM 및 메시지 수신 완료(ACK) 처리.

### 2.2. 엔터프라이즈 코어 아키텍처 사양 (7대 과제)
12. **Redis Blacklist & Session Manager**: JWT JTI 기반 Redis 인메모리 세션 검증 및 원격 세션 해제 API 구현.
13. **Hierarchical Bitmask ACL**: 16진수 비트 연산을 통한 $O(1)$ 빠른 권한 검증 및 캐싱.
14. **Redis Redlock 분산 락**: `ioredis` 원자적 Lua 스크립트 기반 `@DistributedLock()` 데코레이터 구현.
15. **Transactional Outbox Pattern**: 메인 DB 트랜잭션과 메세지 발행 동기화로 이메일/알림 유실율 0% 보장.
16. **Envelope Encryption & Blind Indexing**: AWS KMS 연동 AES-256-GCM 컬럼 암호화 및 검색용 Blind Index 구축.
17. **OpenTelemetry 분산 트레이싱**: W3C Trace Context (`traceparent`) 헤더 전파 및 엔드투엔드 Latency 추적.
18. **Vitest Automated BDD Test Suite**: Statements 85%, Branches 80% 이상의 CI/CD 커버리지 기준 적용.

### 2.3. 하이퍼스케일 기술 사양 (8대 과제)
19. **Multi-Region Active-Active DR**: AWS Aurora Global Database + Cross-Region S3 복제 기반 RTO=0 재해 복구.
20. **SOC2 Type II & Zero-Trust Mesh**: Istio Service Mesh mTLS 암호화 및 HashiCorp Vault 동적 자격 증명.
21. **LLM Semantic Caching & PII Redactor**: Qdrant Vector DB 의미론적 캐싱을 통한 AI API 비용 80% 절감.
22. **Stripe-Style Webhooks Engine**: 외부 슬랙/자피어 연동용 HMAC-SHA256 서명 검증 및 Exponential Backoff 재시도 큐.
23. **Sliding-Window Multi-Tenant Rate Limiter**: Redis Lua Script 기반 테넌트별 API 소음 격리(Noisy Neighbor Isolation).
24. **Feature Flag Engine**: Unleash 호환 규격 기반 런타임 피처 플래그 및 카나리 배포 엔진.
25. **Automated Chaos Engineering**: Chaos Mesh 기반 무작위 장애 주입 및 자가치유(Self-Healing) 검증.
26. **Knowledge Graph Engine**: PostgreSQL `ltree` 및 Vector Index 기반 지식 그래프 연관 탐색 엔진.

---

## 3. Master Prisma Schema

```prisma
// packages/database/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
  output   = "../client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                 String    @id @map("id")
  email              String?   @unique @map("email")
  password           String?   @map("password")
  firstName          String    @map("firstname")
  lastName           String?   @map("lastname")
  nickname           String?   @map("nickname")
  bio                String?   @map("bio")
  phoneEncrypted     String?   @map("phone_encrypted")
  phoneBlindIndex    String?   @map("phone_blind_idx")
  profileImage       String?   @map("profile_image")
  defaultNameDisplay String    @default("NICKNAME") @map("default_name_display")
  provider           String    @default("local") @map("provider")
  systemRole         String    @default("USER") @map("system_role")

  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at")

  workspaceMembers WorkspaceMember[]
  auditLogs        AuditLog[]
  sentMessages     ChatMessage[]

  @@index([phoneBlindIndex])
  @@map("users")
}

model Workspace {
  id              String   @id @map("id")
  name            String   @map("name")
  logoUrl         String?  @map("logo_url")
  description     String?  @map("description")
  domain          String?  @unique @map("domain")
  isPrivate       Boolean  @default(true) @map("is_private")
  allowedNameType String   @default("ALLOW_NICKNAME") @map("allowed_name_type")
  tags            String[] @default([]) @map("tags")
  workspaceType   String   @default("OPEN") @map("workspace_type")

  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at")

  members  WorkspaceMember[]
  nanos    Nano[]
  policies WorkspacePolicy[]

  @@index([isPrivate, workspaceType])
  @@map("workspaces")
}

model WorkspacePolicy {
  id          String @id @map("id")
  workspaceId String @map("workspace_id")
  policyKey   String @map("policy_key")
  policyValue String @map("policy_value")

  workspace Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  @@unique([workspaceId, policyKey])
  @@map("workspace_policies")
}

model Nano {
  id            String  @id @map("id")
  workspaceId   String  @map("workspace_id")
  parentNanoId  String? @map("parent_nano_id")
  type          String? @map("type")
  title         String? @map("title")
  content       Json?   @map("content")
  positionStr   String  @default("a0") @map("position_str")
  writerId      String? @map("writer_id")
  version       Int     @default(1) @map("version")
  accessBitmask Int     @default(15) @map("access_bitmask")

  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at")

  parent   Nano?  @relation("NanoHierarchy", fields: [parentNanoId], references: [id], onDelete: Cascade)
  children Nano[] @relation("NanoHierarchy")

  @@index([workspaceId, parentNanoId, positionStr])
  @@map("nanos")
}

model OutboxEvent {
  id            String    @id @map("id")
  aggregateType String    @map("aggregate_type")
  aggregateId   String    @map("aggregate_id")
  eventType     String    @map("event_type")
  payload       Json      @map("payload")
  status        String    @default("PENDING") @map("status")
  retryCount    Int       @default(0) @map("retry_count")
  errorLog      String?   @map("error_log")
  createdAt     DateTime  @default(now()) @map("created_at")
  processedAt   DateTime? @map("processed_at")

  @@index([status, createdAt])
  @@map("outbox_events")
}
```

---

## 4. NestJS 핵심 엔진 구현 소스코드

### 4.1. Redis Redlock Interceptor & Decorator

```typescript
// apps/api/src/common/decorators/distributed-lock.decorator.ts
import { applyDecorators, UseInterceptors, SetMetadata } from '@nestjs/common';
import { DistributedLockInterceptor } from '../interceptors/distributed-lock.interceptor';

export const LOCK_KEY_BUILDER = 'LOCK_KEY_BUILDER';
export const LOCK_TTL = 'LOCK_TTL';

export function DistributedLock(keyBuilder: (args: any[]) => string, ttlMs: number = 5000) {
  return applyDecorators(
    SetMetadata(LOCK_KEY_BUILDER, keyBuilder),
    SetMetadata(LOCK_TTL, ttlMs),
    UseInterceptors(DistributedLockInterceptor),
  );
}
```

```typescript
// apps/api/src/common/interceptors/distributed-lock.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, from } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';
import { RedisService } from '../../redis/redis.service';
import { LOCK_KEY_BUILDER, LOCK_TTL } from '../decorators/distributed-lock.decorator';

@Injectable()
export class DistributedLockInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const keyBuilder = this.reflector.get<(args: any[]) => string>(
      LOCK_KEY_BUILDER,
      context.getHandler(),
    );
    const ttlMs = this.reflector.get<number>(LOCK_TTL, context.getHandler()) || 5000;

    if (!keyBuilder) {
      return next.handle();
    }

    const args = context.getArgs();
    const lockKey = keyBuilder(args);
    const lockValue = `${Date.now()}_${Math.random()}`;

    return from(this.acquireLock(lockKey, lockValue, ttlMs)).pipe(
      mergeMap((acquired) => {
        if (!acquired) {
          throw new ConflictException(
            '현재 다른 요청이 처리 중입니다. 잠시 후 다시 시도해 주세요.',
          );
        }
        return next.handle().pipe(
          finalize(async () => {
            await this.releaseLock(lockKey, lockValue);
          }),
        );
      }),
    );
  }

  private async acquireLock(key: string, value: string, ttlMs: number): Promise<boolean> {
    const result = await this.redisService.getClient().set(key, value, 'PX', ttlMs, 'NX');
    return result === 'OK';
  }

  private async releaseLock(key: string, value: string): Promise<void> {
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    await this.redisService.getClient().eval(script, 1, key, value);
  }
}
```

### 4.2. AES-256-GCM Envelope Encryption & Blind Index Service

```typescript
// apps/api/src/common/crypto/crypto.service.ts
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key = Buffer.from(process.env.ENCRYPTION_KEY || '00'.repeat(32), 'hex');
  private readonly blindIndexSecret = process.env.BLIND_INDEX_SECRET || 'default-blind-secret';

  encrypt(plaintext: string): string {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag().toString('hex');
    return `${iv.toString('hex')}:${tag}:${encrypted}`;
  }

  decrypt(ciphertext: string): string {
    const [ivHex, tagHex, encryptedHex] = ciphertext.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  generateBlindIndex(plaintext: string): string {
    return crypto
      .createHmac('sha256', this.blindIndexSecret)
      .update(plaintext.trim().toLowerCase())
      .digest('hex');
  }
}
```
