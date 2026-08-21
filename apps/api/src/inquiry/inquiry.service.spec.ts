// apps/api/src/inquiry/inquiry.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { InquiryService } from './inquiry.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

describe('InquiryService (Unit Test)', () => {
  let service: InquiryService;
  let prismaMock: {
    inquiry: {
      create: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    prismaMock = {
      inquiry: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InquiryService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<InquiryService>(InquiryService);
  });

  describe('createInquiry', () => {
    it('문의글 생성을 정상적으로 처리해야 한다', async () => {
      const mockResult = {
        id: 'inquiry-1',
        title: '테스트 문의',
        content: '문의 내용입니다',
        isSecret: false,
        status: 'PENDING',
        authorId: 'user-1',
      };
      prismaMock.inquiry.create.mockResolvedValue(mockResult);

      const res = await service.createInquiry('user-1', {
        title: '테스트 문의',
        content: '문의 내용입니다',
        isSecret: false,
      });

      expect(res).toEqual(mockResult);
      expect(prismaMock.inquiry.create).toHaveBeenCalled();
    });
  });

  describe('findAllInquiries', () => {
    it('타인의 비밀글은 마스킹하여 반환해야 한다', async () => {
      const mockInquiries = [
        {
          id: 'inquiry-1',
          title: '공개글',
          content: '내용',
          isSecret: false,
          authorId: 'user-1',
        },
        {
          id: 'inquiry-2',
          title: '비밀글',
          content: '비밀 내용',
          isSecret: true,
          authorId: 'user-2',
        },
      ];
      prismaMock.inquiry.findMany.mockResolvedValue(mockInquiries);

      const res = await service.findAllInquiries({ userId: 'user-1' });

      expect(res[0].title).toBe('공개글');
      expect(res[1].title).toBe('🔒 비밀글입니다.');
      expect(res[1].content).toBe('작성자 본인과 관리자만 열람할 수 있습니다.');
    });

    it('SUPER_ADMIN은 타인의 비밀글 원본을 볼 수 있어야 한다', async () => {
      const mockInquiries = [
        {
          id: 'inquiry-2',
          title: '비밀글',
          content: '비밀 내용',
          isSecret: true,
          authorId: 'user-2',
        },
      ];
      prismaMock.inquiry.findMany.mockResolvedValue(mockInquiries);

      const res = await service.findAllInquiries({
        userId: 'admin-1',
        systemRole: 'SUPER_ADMIN',
      });

      expect(res[0].title).toBe('비밀글');
      expect(res[0].content).toBe('비밀 내용');
    });
  });

  describe('findInquiryById', () => {
    it('타인의 비밀글 단건 조회 시 ForbiddenException을 발생시켜야 한다', async () => {
      prismaMock.inquiry.findUnique.mockResolvedValue({
        id: 'inquiry-2',
        title: '비밀글',
        isSecret: true,
        authorId: 'user-2',
      });

      await expect(
        service.findInquiryById('inquiry-2', { userId: 'user-1' }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('answerInquiry', () => {
    it('SUPER_ADMIN이 아니면 답변 등록 시 ForbiddenException을 발생시켜야 한다', async () => {
      await expect(
        service.answerInquiry(
          'inquiry-1',
          { answer: '답변' },
          { userId: 'user-1', systemRole: 'USER' },
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('SUPER_ADMIN은 답변을 정상 등록하고 상태를 ANSWERED로 전환해야 한다', async () => {
      prismaMock.inquiry.findUnique.mockResolvedValue({
        id: 'inquiry-1',
        status: 'PENDING',
      });
      prismaMock.inquiry.update.mockResolvedValue({
        id: 'inquiry-1',
        answer: '답변 내용',
        status: 'ANSWERED',
      });

      const res = await service.answerInquiry(
        'inquiry-1',
        { answer: '답변 내용' },
        { userId: 'admin-1', systemRole: 'SUPER_ADMIN' },
      );

      expect(res.status).toBe('ANSWERED');
      expect(res.answer).toBe('답변 내용');
    });
  });
});
