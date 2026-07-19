import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { TokenHelper } from './utils/token.helper';
import { MailerService } from '../mailer/mailer.service';
import { RedisService } from '../redis/redis.service';
import { dbMock } from '../prisma/__mocks__/prisma.service';
import {
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as argon2 from 'argon2';

jest.mock('argon2', () => ({
  hash: jest
    .fn()
    .mockImplementation((pwd: string) => Promise.resolve(`hashed-${pwd}`)),
  verify: jest
    .fn()
    .mockImplementation((hash: string, pwd: string) =>
      Promise.resolve(hash === `hashed-${pwd}`),
    ),
}));

describe('AuthService (Unit/Integration Test)', () => {
  let service: AuthService;

  // 가상 메일 서비스
  const mockMailerService = {
    sendWelcomeMail: jest.fn(),
    sendInvitationMail: jest.fn(),
  };

  // 가상 토큰 헬퍼
  const mockTokenHelper = {
    generateAndSaveTokens: jest.fn().mockResolvedValue({
      user: { id: 'user-1', email: 'test@example.com' },
      accessToken: 'access-token-mock',
      refreshToken: 'refresh-token-mock',
    }),
  };

  // 가상 레디스 서비스
  const mockRedisService = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: dbMock },
        { provide: TokenHelper, useValue: mockTokenHelper },
        { provide: MailerService, useValue: mockMailerService },
        { provide: RedisService, useValue: mockRedisService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('registerUser (회원가입 및 비밀번호 단방향 암호화)', () => {
    it('회원 가입 시 비밀번호가 평문으로 저장되지 않고 해싱되어 전달되어야 한다', async () => {
      const registerDto = {
        email: 'newuser@example.com',
        password: 'Password123!',
        firstName: 'Gildong',
        lastName: 'Hong',
      };

      // 이메일 중복 없음
      dbMock.user.findUnique.mockResolvedValue(null);
      // 저장 시 가상 응답
      dbMock.user.create.mockImplementation((args: any) => {
        return Promise.resolve({
          id: 'new-cuid-1',
          email: args.data.email,
          password: args.data.password, // 해싱된 상태여야 함
          firstName: args.data.firstName,
          lastName: args.data.lastName,
          provider: 'local',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        });
      });

      const result = await service.registerUser(registerDto);

      // 1. 비밀번호 필드는 결과에서 마스킹/제외되어야 함
      expect(result).not.toHaveProperty('password');
      // 2. 실제 DB 적재(create)에 넘어간 패스워드 값이 암호문(argon2 해시 포맷)인지 검증
      const mockCreateCalls = dbMock.user.create.mock.calls[0][0];
      expect(mockCreateCalls.data.password).not.toBe(registerDto.password);
      expect(
        await argon2.verify(
          mockCreateCalls.data.password,
          registerDto.password,
        ),
      ).toBe(true);
    });

    it('이미 가입된 이메일인 경우 ConflictException을 던져야 한다', async () => {
      dbMock.user.findUnique.mockResolvedValue({ id: 'existing-id' } as any);

      await expect(
        service.registerUser({
          email: 'existing@example.com',
          password: 'Password123!',
          firstName: 'Name',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('refreshTokens (RTR 1회 최적화 검증)', () => {
    const mockUser = {
      id: 'user-1',
      email: 'test@example.com',
      deletedAt: null,
    } as any;

    it('유효한 jti와 토큰 세션이 주어지면 기존 세션을 삭제하고 새 세션을 복구 반환해야 한다', async () => {
      const mockJti = 'token-jti-123';
      const mockRawRefreshToken = 'raw-refresh-token';
      const mockHashedRefreshToken = await argon2.hash(mockRawRefreshToken);

      dbMock.user.findUnique.mockResolvedValue(mockUser);
      dbMock.refreshToken.findUnique.mockResolvedValue({
        id: 'session-1',
        userId: 'user-1',
        hashedToken: mockHashedRefreshToken,
        jti: mockJti,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1시간 남음
      } as any);

      const result = await service.refreshTokens(
        mockUser.id,
        mockJti,
        mockRawRefreshToken,
      );

      // 1. 결과 반환값 검증
      expect(result).toHaveProperty('accessToken');
      // 2. 단일 조회 쿼리가 올바르게 jti를 타깃하는지 검증
      expect(dbMock.refreshToken.findUnique).toHaveBeenCalledWith({
        where: { jti: mockJti },
      });
      // 3. 재사용이 감지되면 기존 토큰 세션을 DB에서 삭제하는지 검증
      expect(dbMock.refreshToken.delete).toHaveBeenCalledWith({
        where: { id: 'session-1' },
      });
    });

    it('탈취/위조된 jti가 인입될 경우 세션 조회 실패로 UnauthorizedException을 던져야 한다', async () => {
      dbMock.user.findUnique.mockResolvedValue(mockUser);
      // DB에 일치하는 jti 레코드 없음
      dbMock.refreshToken.findUnique.mockResolvedValue(null);

      await expect(
        service.refreshTokens(mockUser.id, 'fake-jti', 'some-token'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('이미 만료 기간이 지난 토큰인 경우 UnauthorizedException을 반환해야 한다', async () => {
      const mockJti = 'expired-jti';
      dbMock.user.findUnique.mockResolvedValue(mockUser);
      dbMock.refreshToken.findUnique.mockResolvedValue({
        id: 'session-2',
        userId: 'user-1',
        jti: mockJti,
        expiresAt: new Date(Date.now() - 1000), // 만료됨
      } as any);

      await expect(
        service.refreshTokens(mockUser.id, mockJti, 'some-token'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('loginUser (로그인 실패 수 잠금 처리)', () => {
    const loginDto = {
      email: 'login-test@example.com',
      password: 'wrong-password',
    };
    const mockUser = {
      id: 'user-2',
      email: 'login-test@example.com',
      password: 'hashed-password',
      provider: 'local',
      deletedAt: null,
    } as any;

    it('정상 로그인 시, 실패 횟수가 del 처리되어 초기화되어야 한다', async () => {
      dbMock.user.findUnique.mockResolvedValue(mockUser);
      (argon2.verify as jest.Mock).mockResolvedValue(true);
      mockRedisService.get.mockResolvedValue(null); // 잠금 및 실패 기록 없음

      await service.loginUser({
        email: 'login-test@example.com',
        password: 'correct-password',
      });

      expect(mockRedisService.del).toHaveBeenCalledWith(
        'login:fail-count:login-test@example.com',
      );
    });

    it('로그인 실패 5회 도달 시 1분 동안 잠금 상태를 활성화하고 BadRequestException을 던져야 한다', async () => {
      dbMock.user.findUnique.mockResolvedValue(mockUser);
      (argon2.verify as jest.Mock).mockResolvedValue(false); // 패스워드 불일치
      mockRedisService.get.mockImplementation((key: string) => {
        if (key.includes('lock')) return Promise.resolve(null);
        if (key.includes('fail-count')) return Promise.resolve('4'); // 이미 4회 실패 상태
        return Promise.resolve(null);
      });

      await expect(service.loginUser(loginDto)).rejects.toThrow(
        BadRequestException,
      );

      // 1분(60초) 잠금 유도 확인
      expect(mockRedisService.set).toHaveBeenCalledWith(
        'login:lock:login-test@example.com',
        'locked',
        60,
      );
    });

    it('로그인 실패 시, 실패 횟수가 메시지에 포함된 UnauthorizedException을 던져야 한다 (예: 1/5회)', async () => {
      dbMock.user.findUnique.mockResolvedValue(mockUser);
      (argon2.verify as jest.Mock).mockResolvedValue(false); // 패스워드 불일치
      mockRedisService.get.mockImplementation((key: string) => {
        if (key.includes('lock')) return Promise.resolve(null);
        if (key.includes('fail-count')) return Promise.resolve('2'); // 이미 2회 실패 상태
        return Promise.resolve(null);
      });

      await expect(service.loginUser(loginDto)).rejects.toThrow(
        new UnauthorizedException(
          '이메일 또는 비밀번호가 올바르지 않습니다. (3/5회)',
        ),
      );
    });

    it('이미 계정이 잠금된 상태이면 즉시 BadRequestException을 던져야 한다', async () => {
      mockRedisService.get.mockImplementation((key: string) => {
        if (key.includes('lock')) return Promise.resolve('locked'); // 잠금 상태
        return Promise.resolve(null);
      });

      await expect(service.loginUser(loginDto)).rejects.toThrow(
        BadRequestException,
      );

      // DB 접근 전에 사전 차단해야 함
      expect(dbMock.user.findUnique).not.toHaveBeenCalled();
    });
  });
});
