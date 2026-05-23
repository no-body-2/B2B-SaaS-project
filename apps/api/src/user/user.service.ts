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
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
}
