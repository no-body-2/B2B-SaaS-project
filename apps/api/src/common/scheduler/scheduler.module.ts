// apps/api/src/common/scheduler/scheduler.module.ts

/**
 * Scheduler Module
 * @description
 * - 주기적인 리소스 정리 및 만료 처리를 담당하는 모듈
 *
 * @author  <Nobody>
 * @date 2026-06-19
 */

import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}
