// apps/api/src/channel/channel.module.ts

/**
 * Channel Module
 *
 * @description
 * Channel Service를 제공하는 모듈
 *
 * @author  <Nobody>
 * @date 2026-06-11
 */

import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { WorkspaceGuardService } from '../common/guard/workspace-guard.service';

@Module({
  imports: [],
  controllers: [ChannelController],
  providers: [ChannelService, WorkspaceGuardService],
  exports: [ChannelService],
})
export class ChannelModule {}
