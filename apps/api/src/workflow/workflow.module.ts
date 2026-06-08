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
import { WorkspaceGuardService } from '../common/guard/workspace-guard.service';

@Module({
  controllers: [WorkflowController],
  providers: [WorkflowService, WorkspaceGuardService],
  exports: [WorkflowService],
})
export class WorkflowModule {}
