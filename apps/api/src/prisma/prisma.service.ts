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
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

// Prisma v7 부터는 "Lazy Connection" 기능이 추가되어 OnModuleInit 사용이 불필요
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // 1. PostgreSQL 주소 가져오기
    const connectionString = process.env.DATABASE_URL;

    // 1-1. 환경변수 가져오기의 성공 여부 확인
    if (!connectionString) {
      throw new Error(
        '데이터베이스 연결 실패: DATABASE_URL 환경변수가 설정되지 않았습니다.',
      );
    }

    // 2. pg 모듈의 커넥션 Pool 생성
    const pool = new Pool({ connectionString });

    // 3. Prisma 용 PostgreSQL Adapter와 Pool 연결
    const adapter = new PrismaPg(pool);

    // 4. PrismaClient에 Adapter 설정
    super({ adapter });
  }
}
