// src/common/guard/guard.module.ts

/**
 * Guard Module
 * @description
 * - Guard 파일들을 관리하는 모듈
 *
 * @author  <Nobody>
 * @date 2026-06-17
 */

import { Module } from '@nestjs/common';
import { WorkspaceGuardService } from './workspace-guard.service';

@Module({
  providers: [WorkspaceGuardService],
  exports: [WorkspaceGuardService],
})
export class GuardModule {}
