// apps/api/src/workspace/workspace.module.ts

/**
 * Workspace Module
 *
 * @description
 * Workspace Service를 제공하는 모듈
 *
 * @author  <Nobody>
 * @date 2026-05-26
 */

import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
