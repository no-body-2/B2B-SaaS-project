import { PrismaClient } from '@b2b/database';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

// 각 테스트 실행 전에 mock 인스턴스를 초기화합니다.
beforeEach(() => {
  mockReset(dbMock);
});

export const dbMock = mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;
