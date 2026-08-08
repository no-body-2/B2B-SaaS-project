// apps/api/src/admin/health.controller.ts

/**
 * Health Check Controller
 *
 * @description
 * - Super Admin 인프라 헬스 체크 컨트롤러
 *
 * @author <nobody>
 * @date 2026-08-08
 */

import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SystemRolesGuard } from '../common/guards/system-roles.guard';
import { SystemRoles } from '../common/decorators/system-roles.decorator';

@Controller('admin/health')
@UseGuards(JwtAuthGuard, SystemRolesGuard)
@SystemRoles('SUPER_ADMIN')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: PrismaHealthIndicator,
    private prisma: PrismaService,
  ) {}

  /**
   * 1. 데이터베이스 헬스 체크
   */
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database', this.prisma),
    ]);
  }
}
