// apps/api/src/prisma/prisma.service.ts

/**
 * Prisma Service
 *
 * @description
 * Prisma 모듈의 Service
 *
 * @author  <Nobody>
 * @date 2026-05-15
 */

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@b2b/database';

// Prisma v7 부터는 "Lazy Connection" 기능이 추가되어 OnModuleInit 사용이 불필요
@Injectable()
export class PrismaService extends PrismaClient {}
