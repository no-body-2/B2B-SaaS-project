// apps/api/src/user/user.service.ts

/**
 * User Service
 *
 * @description
 * User 모듈의 Service
 *
 * @author  <Nobody>
 * @date 2026-05-22
 */

import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { createId } from '@paralleldrive/cuid2';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RequestEmailChangeDto } from './dto/request-email-change.dto';
import { VerifyEmailChangeDto } from './dto/verify-email-change.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * USER-PROFILE-001
   * 사용자 프로필 조회
   * @description
   * - Access Token에서 추출한 userId를 기반으로 사용자의 상세 정보를 조회
   * @param userId - 사용자 ID (CUID)
   * @returns Password가 제외된 사용자 프로필 객체
   * @throws
   * - {UnauthorizedException} - 인증되지 않은 사용자일 경우
   * - {NotFoundException} - 사용자를 찾을 수 없을 경우
   */
  async getMyProfile(userId: string) {
    if (!userId) {
      throw new UnauthorizedException('인증되지 않은 사용자입니다.');
    }

    // 1. Prisma를 사용하여 사용자 조회
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        provider: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });

    // 2. 사용자를 찾을 수 없는 경우
    if (!user) {
      throw new NotFoundException('해당하는 사용자를 찾을 수 없습니다.');
    }

    // 3. 사용자가 탈퇴 대기 중인 경우
    if (user.deletedAt !== null) {
      throw new ForbiddenException('탈퇴 대기 중인 계정입니다.');
    }

    const { deletedAt: _, ...profile } = user;
    return profile;
  }

  /**
   * USER-PROFILE-002
   * 사용자 프로필 수정
   * @description
   * - 사용자 이름을 수정하는 기능
   * @param userId - 사용자 ID (CUID)
   * @param dto - 사용자 프로필 수정 DTO
   * @returns 수정된 사용자 프로필 객체
   * @throws
   * - {UnauthorizedException} - 인증되지 않은 사용자인 경우
   * - {ForbiddenException} - 사용자가 탈퇴 대기 중인 상태로 인증 불가한 경우
   * - {NotFoundException} - 사용자를 찾을 수 없을 경우
   */
  async updateProfile(userId: string, dto: UpdateProfileDto) {
    // 1. 대상 사용자 조회 및 유효성 검증
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('해당하는 사용자를 찾을 수 없습니다.');
    }

    if (user.deletedAt !== null) {
      throw new ForbiddenException(
        '탈퇴 진행 중인 계정은 정보 수정이 불가합니다.',
      );
    }

    // 2. 전달 받은 값만 동적으로 반영하여 DB 업데이트
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        provider: true,
        updatedAt: true,
      },
    });
  }

  /**
   * USER-ACCONUT-001
   * 사용자 비밀번호 변경
   * @description
   * - 현재 사용자의 비밀번호를 검증 후, 신규 비밀번호로 변경
   * @param userId - 사용자 ID (CUID)
   * @param dto - 비밀번호 변경 DTO
   * @returns 비밀번호 변경 성공 메시지
   * @throws
   * - {BadRequestException} - 변경할 비밀번호가 현재 비밀번호와 같거나 양식에 어긋난 경우
   * - {UnauthorizedException} - 인증되지 않은 사용자인 경우
   * - {ForbiddenException} - 사용자가 탈퇴 대기 중인 상태로 인증 불가한 경우
   * - {NotFoundException} - 사용자를 찾을 수 없을 경우
   */
  async changePassword(userId: string, dto: ChangePasswordDto) {
    // 1. 기존 비밀번호와 현재 비밀번호의 일치 여부 확인
    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException(
        '새로운 비밀번호는 현재 비밀번호와 다르게 설정하십시오.',
      );
    }

    // 2. 사용자 조회 및 계정 활성 상태 확인
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // 2-1. 사용자를 찾을 수 없는 경우
    if (!user) {
      throw new NotFoundException('해당하는 사용자를 찾을 수 없습니다.');
    }

    // 2-2. 사용자가 탈퇴 대기 중인 경우
    if (user.deletedAt !== null) {
      throw new ForbiddenException(
        '탈퇴 대기 중인 계정은 정보 수정이 불가합니다.',
      );
    }

    // 2-3. 사용자가 Local이 아닌 경로로 가입한 경우
    if (user.provider !== 'local') {
      throw new ForbiddenException(
        'Local 이외의 수단으로 가입한 사용자는 비밀번호를 변경할 수 없습니다.',
      );
    }

    // 3. 비밀번호 대조
    if (!user.password) {
      throw new UnauthorizedException('계정 정보가 올바르지 않습니다.');
    }

    const isPasswordMatch = await argon2.verify(
      user.password,
      dto.currentPassword,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('현재 비밀번호가 일치하지 않습니다.');
    }

    // 4. 새로운 비밀번호 해싱
    const hashedNewPassword = await argon2.hash(dto.newPassword);

    // 5. 비밀번호 업데이트 - 트랜잭션으로 사용자 비밀번호와 리프레시 토큰 삭제를 함께 처리하여 보안성 강화
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      }),
      this.prisma.refreshToken.deleteMany({
        where: { userId },
      }),
    ]);

    // 6. 응답 반환
    return {
      message:
        '비밀번호 변경이 완료되었습니다. 보안을 위해 기존 기기의 로그아웃이 진행됩니다. 다시 로그인 해주세요.',
      updatedAt: new Date(),
    };
  }

  /**
   * USER-ACCOUNT-002
   * 사용자 이메일 변경 요청
   * @description
   * - 현재 로그인한 Local 가입 사용자가 본인의 계정 이메일 변경 요청
   * @param userId - 사용자 ID (CUID)
   * @param dto - 이메일 변경 요청 dto
   * @returns 이메일 변경 요청 성공 메시지
   * @throws
   * - {BadRequestException} - 변경할 이메일이 현재 이메일과 같거나 양식에 어긋난 경우
   * - {UnauthorizedException} - 인증되지 않은 사용자인 경우
   * - {ForbiddenException} - 사용자가 Local 이외의 경로로 가입하였거나, 탈퇴 대기 중인 상태로 인증 불가한 경우
   * - {NotFoundException} - 사용자를 찾을 수 없을 경우
   */
  async requestEmailChange(userId: string, dto: RequestEmailChangeDto) {
    // 1. 사용자 조회 및 상태 검증
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // 1-1. 사용자를 찾을 수 없는 경우
    if (!user) {
      throw new NotFoundException('해당하는 사용자를 찾을 수 없습니다.');
    }

    // 1-2. 사용자의 계정이 탈퇴 진행 중인 경우
    if (user.deletedAt !== null) {
      throw new ForbiddenException(
        '탈퇴 대기 중인 계정은 이메일 변경이 불가합니다.',
      );
    }

    // 1-3. 사용자가 Local 가입이 아닌 경우
    if (user.provider !== 'local') {
      throw new ForbiddenException(
        'Local 이외의 경로로 가입한 계정은 이메일 변경이 불가합니다.',
      );
    }

    // 1-4. 변경하려는 이메일이 현재 사용하는 이메일과 동일한 경우
    if (dto.newEmail === user.email) {
      throw new BadRequestException(
        '변경하려는 이메일은 기존 사용 중인 이메일과 동일할 수 없습니다.',
      );
    }

    // 2. 신규 이메일 중복 검사 (타 사용자가 사용하는 지 여부)
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.newEmail },
    });
    if (exists) {
      throw new ConflictException('이미 사용 중인 이메일 주소입니다.');
    }

    // 3. 429 (Too Many Requests) 에러 방어
    const cooldownKey = `email-change:cooldown:${userId}`;
    const isCooldown = await this.redisService.get(cooldownKey);
    if (isCooldown) {
      throw new HttpException(
        '이메일 변경 요청은 1분에 한 번만 가능합니다. 잠시 후 다시 시도해주세요.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // 4. CUID 기반의 일회성 인증용 Token 생성 및 Redis에 저장
    const token = createId(); // cuid2의 기능 사용
    const tokenKey = `email-change:token:${token}`;

    await Promise.all([
      this.redisService.set(
        tokenKey,
        JSON.stringify({ userId, newEmail: dto.newEmail }),
        1800,
      ),
      this.redisService.set(cooldownKey, 'active', 60), // 1분 쿨다운 설정
    ]);

    // 5. 인증 링크 생성
    // TODO: MailerService 생성 및 연동 후 메일 발송 처리 및 테스트
    const verifiedUrl = `https://example.com/user/email-change/verify?token=${token}`;
    console.log(`[인증 메일 발송 완료] URL: ${verifiedUrl}`);

    return {
      message: '인증 메일이 발송되었습니다. 30분 이내에 인증을 완료해 주세요.',
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    };
  }

  /**
   * USER-ACCOUNT-003
   * 사용자 이메일 변경 요청 승인
   * @description
   * - Local 가입 사용자의 이메일 변경 요청 승인
   * @param dto - URL Query Parameter로 전달된 토큰 객체
   * @returns 이메일 변경 요청 승인 성공 메시지 및 상태
   * @throws
   * - {BadRequestException} - 만료되었거나 유효하지 않은 인증 토큰을 사용한 경우
   */
  async verifyEmailChange(dto: VerifyEmailChangeDto) {
    const tokenKey = `email-change:token:${dto.token}`;

    // 1. Redis에서 Token Session 정보 추출
    const tokenSession = await this.redisService.get(tokenKey);
    if (!tokenSession) {
      throw new BadRequestException(
        '인증 토큰이 유효하지 않거나 만료되었습니다.',
      );
    }

    const { userId, newEmail } = JSON.parse(tokenSession) as {
      userId: string;
      newEmail: string;
    };

    // 2. 2차 중복 검증 방어 (30분 이내에 다른 사용자가 해당 이메일로 가입하였을 경우 대비)
    const isEmailOccupied = await this.prisma.user.findUnique({
      where: { email: newEmail },
    });

    if (isEmailOccupied) {
      throw new ConflictException(
        '인증 과정 중 다른 사용자가 해당 이메일로 가입하였습니다.',
      );
    }

    // 3. DB 갱신
    await this.prisma.user.update({
      where: { id: userId },
      data: { email: newEmail },
    });

    // 4. 보안을 위해 Redis에서 Token 즉시 삭제 및 모든 세션 로그아웃
    await this.redisService.del(tokenKey);

    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });

    return {
      message: '이메일 주소가 성공적으로 변경되었습니다. 다시 로그인 해주세요.',
      updatedAt: new Date(),
    };
  }
}
