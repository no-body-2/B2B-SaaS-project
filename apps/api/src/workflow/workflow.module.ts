// apps/api/src/workflow/workflow.module.ts

/**
 * Nano Workflow Module
 *
 * @description
 * Nano Workflow Service를 제공하는 모듈
 *
 * @author  <Nobody>
 * @date 2026-06-06
 */

import { Module } from '@nestjs/common';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';
import { GuardModule } from '../common/guard/guard.module';

@Module({
  imports: [GuardModule],
  controllers: [WorkflowController],
  providers: [WorkflowService],
  exports: [WorkflowService],
})
export class WorkflowModule {}
