// apps/api/src/admin/admin.module.ts

/**
 * Admin Module
 *
 * @description
 * - Super Admin (System Developer) 모듈
 *
 * @author <nobody>
 * @date 2026-08-08
 */

import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { HealthController } from './health.controller';
import { AdminService } from './admin.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TerminusModule } from '@nestjs/terminus';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, TerminusModule, JwtModule],
  controllers: [AdminController, HealthController],
  providers: [AdminService],
})
export class AdminModule {}
