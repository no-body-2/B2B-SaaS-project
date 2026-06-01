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

@Module({
  imports: [
    AuthModule,
    UserModule,
    WorkspaceModule,
    RedisModule,
    PrismaModule,
    NanoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
