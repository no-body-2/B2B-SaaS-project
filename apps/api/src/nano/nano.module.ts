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
import { WorkspaceGuardService } from '../common/guard/workspace-guard.service';
import { NanoTreeHelper } from './utils/nano-tree.helper';

@Module({
  imports: [],
  controllers: [NanoController],
  providers: [NanoService, NanoTreeHelper, WorkspaceGuardService],
  exports: [NanoService, NanoTreeHelper],
})
export class NanoModule {}
