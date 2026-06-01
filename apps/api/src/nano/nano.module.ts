// apps/api/src/nano/nano.module.ts

/**
 * Nano Module
 *
 * @description
 * Nano Service를 제공하는 모듈
 *
 * @author  <Nobody>
 * @date 2026-05-30
 */

import { Module } from '@nestjs/common';
import { NanoService } from './nano.service';
import { NanoController } from './nano.controller';
import { WorkspaceGuardService } from '../workspace/workspace-guard.service';

@Module({
  imports: [],
  controllers: [NanoController],
  providers: [NanoService, WorkspaceGuardService],
  exports: [NanoService],
})
export class NanoModule {}
