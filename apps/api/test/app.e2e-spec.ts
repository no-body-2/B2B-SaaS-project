import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { dbMock } from '../src/prisma/__mocks__/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

describe('App & Auth Flow (e2e)', () => {
  let app: INestApplication<App>;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(dbMock) // 실제 물리 DB 쿼리 오염을 원천 차단하기 위해 PrismaService를 mock으로 가로챕니다.
      .compile();

    app = moduleFixture.createNestApplication();

    // main.ts의 ValidationPipe 환경을 일치시킵니다.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        stopAtFirstError: true,
      }),
    );

    await app.init();
    jwtService = moduleFixture.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET / (헬스체크)', () => {
    it('200 OK와 함께 Hello World 메시지를 반환해야 한다', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  });

  describe('Auth & User E2E 통합 시나리오', () => {
    const testUser = {
      id: 'u-e2e-user',
      email: 'e2e@example.com',
      password: 'PlainPassword123!',
      hashedPassword: '', // beforeEach에서 argon2로 해싱하여 초기화
      firstName: 'E2E',
      lastName: 'Test',
      provider: 'local',
      deletedAt: null,
    };

    beforeAll(async () => {
      testUser.hashedPassword = await argon2.hash(testUser.password);
    });

    it('POST /auth/register (회원 가입)', async () => {
      // 1. 중복 가입 체크 통과
      dbMock.user.findUnique.mockResolvedValue(null);
      // 2. 가입 처리 Mocking
      dbMock.user.create.mockResolvedValue({
        id: testUser.id,
        email: testUser.email,
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        provider: testUser.provider,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as any);

      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: testUser.email,
          password: testUser.password,
          firstName: testUser.firstName,
          lastName: testUser.lastName,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.email).toBe(testUser.email);
          expect(res.body).not.toHaveProperty('password'); // 패스워드 마스킹 확인
        });
    });

    it('POST /auth/login (인증 및 JWT 발급)', async () => {
      // 1. 사용자 조회 성공
      dbMock.user.findUnique.mockResolvedValue({
        id: testUser.id,
        email: testUser.email,
        password: testUser.hashedPassword,
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        provider: testUser.provider,
        deletedAt: null,
      } as any);

      // 2. 세션 저장 Mocking
      dbMock.refreshToken.create.mockResolvedValue({} as any);

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body.user.email).toBe(testUser.email);
        });
    });

    it('POST /auth/refresh (RTR jti 기반 1회용 갱신)', async () => {
      const mockJti = 'e2e-jti-abc';
      // 1. 가상 Refresh Token 생성 (Sign)
      const fakeRefreshToken = await jwtService.signAsync(
        { sub: testUser.id, email: testUser.email, jti: mockJti },
        {
          secret: process.env.JWT_REFRESH_SECRET || 'test_refresh_secret',
          expiresIn: '7d',
        },
      );
      const hashedFakeRT = await argon2.hash(fakeRefreshToken);

      // 2. 서비스 단의 findUnique(user) 성공
      dbMock.user.findUnique.mockResolvedValue({
        id: testUser.id,
        email: testUser.email,
        deletedAt: null,
      } as any);

      // 3. findUnique(refreshToken) 성공
      dbMock.refreshToken.findUnique.mockResolvedValue({
        id: 'session-e2e',
        userId: testUser.id,
        hashedToken: hashedFakeRT,
        jti: mockJti,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1시간 만료 대기
      } as any);

      // 4. 기존 세션 삭제 및 신규 세션 생성 Mocking
      dbMock.refreshToken.delete.mockResolvedValue({} as any);
      dbMock.refreshToken.create.mockResolvedValue({} as any);

      await request(app.getHttpServer())
        .post('/auth/refresh')
        .set('Authorization', `Bearer ${fakeRefreshToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
        });
    });

    it('DELETE /user/me (회원 탈퇴 및 세션 파기)', async () => {
      const mockJti = 'e2e-jti-xyz';
      // 1. 임시 로그인 인증 토큰 발급
      const fakeAccessToken = await jwtService.signAsync(
        { sub: testUser.id, email: testUser.email, jti: mockJti },
        {
          secret: process.env.JWT_ACCESS_SECRET || 'test_access_secret',
          expiresIn: '1h',
        },
      );

      dbMock.user.findUnique.mockResolvedValue({
        id: testUser.id,
        email: testUser.email,
        deletedAt: null,
      } as any);

      // 트랜잭션 soft-delete 및 refreshToken 강제 파기 Mocking
      dbMock.$transaction.mockImplementation(async (callback) =>
        callback(dbMock),
      );
      dbMock.user.update.mockResolvedValue({} as any);
      dbMock.refreshToken.deleteMany.mockResolvedValue({} as any);

      await request(app.getHttpServer())
        .delete('/user/me')
        .set('Authorization', `Bearer ${fakeAccessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toContain(
            '회원 탈퇴 요청이 정상 접수되었습니다.',
          );
        });
    });
  });
});
