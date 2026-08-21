// apps/api/src/inquiry/inquiry.controller.ts

/**
 * Inquiry Support Board Controller
 *
 * @description
 * - 1:1 및 일반 문의사항 게시판 엔드포인트 제공
 * - GET: 전체 조회 (비밀글 필터링), 단건 조회
 * - POST: 문의글 작성 (인증 회원)
 * - PATCH: SUPER_ADMIN 전용 답변 등록
 * - DELETE: 작성자 또는 SUPER_ADMIN 문의글 삭제
 *
 * @author <nobody>
 * @date 2026-08-21
 */

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { InquiryService } from './inquiry.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { AnswerInquiryDto } from './dto/answer-inquiry.dto';
import { JwtService } from '@nestjs/jwt';
import { appConfig } from '../common/config/app.config';

interface UserPayload {
  userId: string;
  systemRole?: string;
}

@ApiTags('Inquiries (문의사항 게시판)')
@Controller('inquiries')
export class InquiryController {
  constructor(
    private readonly inquiryService: InquiryService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Request 객체에서 옵셔널 JWT 토큰 추출
   */
  private async getOptionalUser(
    headers: Record<string, string | undefined>,
  ): Promise<UserPayload | undefined> {
    try {
      const authHeader = headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return undefined;
      }
      const token = authHeader.replace('Bearer ', '');
      const rawPayload: unknown = await this.jwtService.verifyAsync(token, {
        secret: appConfig.jwtAccessSecret,
      });

      if (typeof rawPayload === 'object' && rawPayload !== null) {
        const payload = rawPayload as Record<string, unknown>;
        const userId =
          typeof payload.userId === 'string'
            ? payload.userId
            : typeof payload.sub === 'string'
              ? payload.sub
              : '';
        const systemRole =
          typeof payload.systemRole === 'string' ? payload.systemRole : 'USER';

        return { userId, systemRole };
      }
      return undefined;
    } catch (_err) {
      return undefined;
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '문의글 작성' })
  async createInquiry(
    @CurrentUser() user: UserPayload,
    @Body() dto: CreateInquiryDto,
  ) {
    return this.inquiryService.createInquiry(user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: '문의글 목록 조회 (비밀글 마스킹)' })
  async findAllInquiries(
    @Req() req: { headers: Record<string, string | undefined> },
  ) {
    const userCtx = await this.getOptionalUser(req.headers);
    return this.inquiryService.findAllInquiries(userCtx);
  }

  @Get(':id')
  @ApiOperation({ summary: '문의글 상세 조회 (비밀글 권한 체크)' })
  async findInquiryById(
    @Param('id') id: string,
    @Req() req: { headers: Record<string, string | undefined> },
  ) {
    const userCtx = await this.getOptionalUser(req.headers);
    return this.inquiryService.findInquiryById(id, userCtx);
  }

  @Patch(':id/answer')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'SUPER_ADMIN 최고관리자 답변 작성' })
  async answerInquiry(
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
    @Body() dto: AnswerInquiryDto,
  ) {
    return this.inquiryService.answerInquiry(id, dto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '문의글 삭제 (작성자 또는 SUPER_ADMIN)' })
  async deleteInquiry(
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ) {
    return this.inquiryService.deleteInquiry(id, user);
  }
}
