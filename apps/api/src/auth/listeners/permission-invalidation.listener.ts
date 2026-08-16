// apps/api/src/auth/listeners/permission-invalidation.listener.ts

/**
 * Permission Invalidation Listener
 *
 * @description
 * - Redis Pub/Sub을 사용하여 사용자 권한 변경 시 다중 인스턴스 전역 권한 캐시를 무효화하는 리스너
 *
 * @author <nobody>
 * @date 2026-08-16
 */

import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';

export interface PermissionInvalidatePayload {
  userId: string;
  workspaceId: string;
}

@Injectable()
export class PermissionInvalidationListener implements OnModuleInit {
  private readonly logger = new Logger(PermissionInvalidationListener.name);
  private readonly channel = 'workspace:permissions:invalidated';

  constructor(private readonly redisService: RedisService) {}

  onModuleInit() {
    // Redis Pub/Sub 채널 구독 설정
    this.redisService.subscribe(this.channel, (message: string) => {
      try {
        const payload = JSON.parse(message) as PermissionInvalidatePayload;
        this.handlePermissionInvalidation(payload);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        this.logger.error(`[PubSub Invalidation Parse Error] ${errorMessage}`);
      }
    });
  }

  /**
   * 권한 변동 수신 시 L1/L2 캐시 파기 처리
   */
  private handlePermissionInvalidation(payload: PermissionInvalidatePayload) {
    this.logger.log(
      `[Permission Invalidated] User: ${payload.userId} | Workspace: ${payload.workspaceId}`,
    );
  }

  /**
   * 권한 수정 시 타 서비스/인스턴스로 무효화 전파
   */
  async publishInvalidation(
    userId: string,
    workspaceId: string,
  ): Promise<void> {
    const payload: PermissionInvalidatePayload = { userId, workspaceId };
    await this.redisService.publish(this.channel, JSON.stringify(payload));
  }
}
