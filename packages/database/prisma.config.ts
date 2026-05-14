/**
 * packages/database/prisma.config.ts
 *
 * @author  <Nobody>
 * @date 2026-05-08
 * @description Prisma 설정 파일
 */

import { config } from 'dotenv';
import { defineConfig } from '@prisma/config';
import { resolve } from 'path';

config({ path: resolve(__dirname, '.env') });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL']!,
  },
});
