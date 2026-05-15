// apps/api/src/prisma/prisma.module.ts

/**
 * Prisma Module
 *
 * @description
 * Prisma Service를 제공하는 모듈
 *
 * @author  <Nobody>
 * @date 2026-05-15
 */

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// 전역으로 설정하여 모든 도메인에서 PrismaService 즉시 사용 가능
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
