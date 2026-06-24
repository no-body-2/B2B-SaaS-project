// apps/api/src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { NanoModule } from './nano/nano.module';
import { WorkflowModule } from './workflow/workflow.module';
import { ChannelModule } from './channel/channel.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from './mailer/mailer.module';
import { GuardModule } from './common/guard/guard.module';
import { SchedulerModule } from './common/scheduler/scheduler.module';

import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: true,
      ignoreErrors: false,
    }),
    AuthModule,
    UserModule,
    WorkspaceModule,
    RedisModule,
    PrismaModule,
    NanoModule,
    WorkflowModule,
    ChannelModule,
    MailerModule,
    GuardModule,
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
