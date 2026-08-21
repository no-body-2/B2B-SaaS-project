// apps/api/test/e2e/auth-workspace-nano.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Auth & Workspace & Nano E2E Integration Flow Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('1. [GET] /health - 시스템 헬스 체크 엔드포인트가 200 OK를 반환해야 한다.', () => {
    return request(app.getHttpServer()).get('/health').expect(200);
  });
});
