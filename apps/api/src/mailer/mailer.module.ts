// apps/api/src/mailer/mailer.module.ts

/**
 * Mailer Module
 * @description
 * - Mailer 사용을 위한 모듈
 *
 * @author <nobody>
 * @date 2026-06-16
 */

import { Module } from '@nestjs/common';
import { MailerListener } from './listener/mailer.listener';

@Module({
  providers: [MailerListener],
  exports: [],
})
export class MailerModule {}
