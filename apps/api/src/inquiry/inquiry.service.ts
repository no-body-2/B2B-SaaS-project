// apps/api/src/inquiry/inquiry.service.ts

/**
 * Inquiry Support Board Service
 *
 * @description
 * - 1:1 및 일반 문의사항 게시판 CRUD 처리
 * - 비밀글(isSecret) 작성자 본인 및 SUPER_ADMIN 권한제어
 * - SUPER_ADMIN 전용 답변(Answer) 작성
 *
 * @author <nobody>
 * @date 2026-08-21
 */

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { AnswerInquiryDto } from './dto/answer-inquiry.dto';

export interface RequestUserContext {
  userId: string;
  systemRole?: string;
}

@Injectable()
export class InquiryService {
  private readonly logger = new Logger(InquiryService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * 1. 문의글 작성
   */
  async createInquiry(authorId: string, dto: CreateInquiryDto) {
    const inquiry = await this.prisma.inquiry.create({
      data: {
        title: dto.title,
        content: dto.content,
        isSecret: dto.isSecret ?? false,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            nickname: true,
            profileImage: true,
            systemRole: true,
          },
        },
      },
    });

    this.logger.log(
      `[Inquiry Created] ID: ${inquiry.id} | Author: ${authorId}`,
    );
    return inquiry;
  }

  /**
   * 2. 문의글 목록 조회 (비밀글 필터링 및 마스킹)
   */
  async findAllInquiries(userCtx?: RequestUserContext) {
    const inquiries = await this.prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            nickname: true,
            profileImage: true,
          },
        },
      },
    });

    return inquiries.map((inquiry) => {
      const isOwner = userCtx?.userId === inquiry.authorId;
      const isSuperAdmin = userCtx?.systemRole === 'SUPER_ADMIN';
      const canView = !inquiry.isSecret || isOwner || isSuperAdmin;

      if (!canView) {
        return {
          ...inquiry,
          title: '🔒 비밀글입니다.',
          content: '작성자 본인과 관리자만 열람할 수 있습니다.',
          answer: inquiry.answer ? '🔒 비밀 답변입니다.' : null,
        };
      }

      return inquiry;
    });
  }

  /**
   * 3. 문의글 단건 조회 (비밀글 권한 체크)
   */
  async findInquiryById(id: string, userCtx?: RequestUserContext) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            nickname: true,
            profileImage: true,
            systemRole: true,
          },
        },
      },
    });

    if (!inquiry) {
      throw new NotFoundException('요청하신 문의글을 찾을 수 없습니다.');
    }

    const isOwner = userCtx?.userId === inquiry.authorId;
    const isSuperAdmin = userCtx?.systemRole === 'SUPER_ADMIN';

    if (inquiry.isSecret && !isOwner && !isSuperAdmin) {
      throw new ForbiddenException(
        '비밀글은 작성자 본인 및 최고 관리자만 열람할 수 있습니다.',
      );
    }

    return inquiry;
  }

  /**
   * 4. SUPER_ADMIN 답변 작성 및 상태 업데이트
   */
  async answerInquiry(
    id: string,
    dto: AnswerInquiryDto,
    userCtx: RequestUserContext,
  ) {
    if (userCtx.systemRole !== 'SUPER_ADMIN') {
      throw new ForbiddenException(
        '문의글 답변 등록은 최고 관리자(SUPER_ADMIN)만 가능합니다.',
      );
    }

    const existing = await this.prisma.inquiry.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('요청하신 문의글을 찾을 수 없습니다.');
    }

    const updated = await this.prisma.inquiry.update({
      where: { id },
      data: {
        answer: dto.answer,
        answeredAt: new Date(),
        status: 'ANSWERED',
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            nickname: true,
          },
        },
      },
    });

    this.logger.log(
      `[Inquiry Answered] ID: ${id} by SuperAdmin: ${userCtx.userId}`,
    );
    return updated;
  }

  /**
   * 5. 문의글 삭제 (작성자 또는 SUPER_ADMIN 가능)
   */
  async deleteInquiry(id: string, userCtx: RequestUserContext) {
    const existing = await this.prisma.inquiry.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('요청하신 문의글을 찾을 수 없습니다.');
    }

    const isOwner = userCtx.userId === existing.authorId;
    const isSuperAdmin = userCtx.systemRole === 'SUPER_ADMIN';

    if (!isOwner && !isSuperAdmin) {
      throw new ForbiddenException('문의글 삭제 권한이 없습니다.');
    }

    await this.prisma.inquiry.delete({ where: { id } });
    this.logger.log(`[Inquiry Deleted] ID: ${id} by User: ${userCtx.userId}`);
    return { success: true, message: '문의글이 삭제되었습니다.' };
  }
}
