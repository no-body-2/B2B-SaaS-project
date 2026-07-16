// apps/api/src/common/scheduler/scheduler.service.ts

/**
 * Scheduler Service
 *
 * @description
 * 주기적인 백그라운드 태스크(Soft Delete 정리, 토큰/초대장 만료 처리)를 실행하는 서비스
 *
 * @author  <Nobody>
 * @date 2026-06-19
 */

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * handleDailyCleanup
   * @description
   * - 매일 자정 실행되는 리소스 정리 작업
   * - 30일이 경과한 Soft Delete 상태의 워크스페이스 및 Nano 데이터 영구 삭제
   * - 만료된 Refresh Token 삭제
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailyCleanup() {
    this.logger.log('[Daily Cleanup] Starting scheduled resource cleanup...');

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const now = new Date();

    try {
      await this.prisma.$transaction(async (tx) => {
        // --- 1. Soft-deleted Workspaces Cleanup ---
        const workspacesToDelete = await tx.workspace.findMany({
          where: { deletedAt: { lt: thirtyDaysAgo } },
          select: { id: true },
        });
        const workspaceIds = workspacesToDelete.map((w) => w.id);

        if (workspaceIds.length > 0) {
          this.logger.log(
            `[Daily Cleanup] Found ${workspaceIds.length} workspaces to permanently delete: ${workspaceIds.join(', ')}`,
          );

          // Clean up workspace-specific Nano workflow records first to avoid foreign key violations
          await tx.pendingNano.deleteMany({
            where: { nano: { workspaceId: { in: workspaceIds } } },
          });
          await tx.approvalRequest.deleteMany({
            where: { history: { workspaceId: { in: workspaceIds } } },
          });
          await tx.nanoHistory.deleteMany({
            where: { workspaceId: { in: workspaceIds } },
          });
          await tx.nano.deleteMany({
            where: { workspaceId: { in: workspaceIds } },
          });

          // Delete the workspaces (Prisma Cascade will clean up members, invitations, chatrooms, chatMessages)
          const deletedWorkspacesResult = await tx.workspace.deleteMany({
            where: { id: { in: workspaceIds } },
          });
          this.logger.log(
            `[Daily Cleanup] Permanently deleted ${deletedWorkspacesResult.count} workspaces.`,
          );
        }

        // --- 2. Soft-deleted Nanos Cleanup ---
        const nanosToDelete = await tx.nano.findMany({
          where: { deletedAt: { lt: thirtyDaysAgo } },
          select: { id: true },
        });
        const nanoIds = nanosToDelete.map((n) => n.id);

        if (nanoIds.length > 0) {
          this.logger.log(
            `[Daily Cleanup] Found ${nanoIds.length} nanos to permanently delete.`,
          );

          // Clean up referencing workflows first
          await tx.pendingNano.deleteMany({
            where: { nanoId: { in: nanoIds } },
          });
          await tx.approvalRequest.deleteMany({
            where: { nanoId: { in: nanoIds } },
          });
          await tx.nanoHistory.deleteMany({
            where: { nanoId: { in: nanoIds } },
          });

          // Delete Nano records
          const deletedNanosResult = await tx.nano.deleteMany({
            where: { id: { in: nanoIds } },
          });
          this.logger.log(
            `[Daily Cleanup] Permanently deleted ${deletedNanosResult.count} nanos.`,
          );
        }

        // --- 3. Expired Refresh Tokens Cleanup ---
        const deletedTokensResult = await tx.refreshToken.deleteMany({
          where: { expiresAt: { lt: now } },
        });
        if (deletedTokensResult.count > 0) {
          this.logger.log(
            `[Daily Cleanup] Cleaned up ${deletedTokensResult.count} expired refresh tokens.`,
          );
        }

        // --- 4. Expired/Abandoned Workspace Invitations Cleanup ---
        const deletedInvitationsResult =
          await tx.workspaceInvitation.deleteMany({
            where: {
              OR: [{ expiresAt: { lt: now } }, { status: 'EXPIRED' }],
            },
          });
        if (deletedInvitationsResult.count > 0) {
          this.logger.log(
            `[Daily Cleanup] Permanently deleted ${deletedInvitationsResult.count} expired/abandoned workspace invitations.`,
          );
        }
      });

      this.logger.log(
        '[Daily Cleanup] Scheduled resource cleanup finished successfully.',
      );
    } catch (error) {
      this.logger.error(
        '[Daily Cleanup] Error occurred during scheduled cleanup:',
        error instanceof Error ? error.stack : error,
      );
    }
  }

  /**
   * handleHourlyCleanup
   * @description
   * - 매 시간 실행되는 초대장 만료 작업
   * - 만료 시간이 지난 PENDING 상태의 워크스페이스 초대 요청을 EXPIRED 상태로 전환
   */
  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlyCleanup() {
    this.logger.log(
      '[Hourly Cleanup] Starting scheduled invitation cleanup...',
    );

    const now = new Date();

    try {
      const updatedInvitationsResult =
        await this.prisma.workspaceInvitation.updateMany({
          where: {
            expiresAt: { lt: now },
            status: 'PENDING',
          },
          data: {
            status: 'EXPIRED',
          },
        });

      if (updatedInvitationsResult.count > 0) {
        this.logger.log(
          `[Hourly Cleanup] Marked ${updatedInvitationsResult.count} expired pending invitations as EXPIRED.`,
        );
      }

      this.logger.log(
        '[Hourly Cleanup] Scheduled invitation cleanup finished successfully.',
      );
    } catch (error) {
      this.logger.error(
        '[Hourly Cleanup] Error occurred during scheduled invitation cleanup:',
        error instanceof Error ? error.stack : error,
      );
    }
  }
}
