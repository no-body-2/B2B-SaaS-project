// apps/api/src/nano/collaboration/hocuspocus.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { HocuspocusService } from './hocuspocus.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('Hocuspocus Collaboration Unit Test', () => {
  let service: HocuspocusService;

  const mockPrismaService = {
    nano: {
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HocuspocusService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<HocuspocusService>(HocuspocusService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('1. Hocuspocus 서비스 인스턴스가 올바르게 주입되어야 한다.', () => {
    expect(service).toBeDefined();
  });
});
