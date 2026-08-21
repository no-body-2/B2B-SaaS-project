// apps/api/src/inquiry/inquiry.module.ts

/**
 * Inquiry Module
 *
 * @description
 * - 문의사항 게시판 기능 모듈
 *
 * @author <nobody>
 * @date 2026-08-21
 */

import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [InquiryController],
  providers: [InquiryService],
  exports: [InquiryService],
})
export class InquiryModule {}
