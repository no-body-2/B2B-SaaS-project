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
import { ChannelGateway } from './channel.gateway';
import { MailerModule } from '../mailer/mailer.module';
import { GuardModule } from '../common/guard/guard.module';

@Module({
  imports: [MailerModule, GuardModule],
  controllers: [ChannelController],
  providers: [ChannelService, ChannelGateway],
  exports: [ChannelService],
})
export class ChannelModule {}
