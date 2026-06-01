// apps/api/src/nano/nano.service.ts

/**
 * Nano Core Service
 *
 * @description
 * Nano 모듈의 Core Service
 *
 * @author  <Nobody>
 * @date 2026-05-30
 */

// TODO: workspaceGuard, workspaceParamDto 등 중복되는 부분을 별도의 유틸리티로 추출
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkspaceGuardService } from '../workspace/workspace-guard.service';
import { WorkspaceParamDto } from '../workspace/dto/workspace-param.dto';
import { CreateNanoDto } from './dto/create-nano.dto';
import { createId } from '@paralleldrive/cuid2';
import { NanoQueryDto } from './dto/nano-query.dto';

@Injectable()
export class NanoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceGuard: WorkspaceGuardService,
  ) {}

  /**
   * NANO-CORE-001
   * Nano 생성
   * @description
   * - 워크스페이스 인가를 거친 사용자가 Nano 생성
   * @param userId - 사용자 ID (CUID)
   * @param param - Workspace 정보가 담긴 객체
   * @param dto - Nano 생성에 사용되는 DTO
   * @returns 생성 성공 메시지 및 정보 반환
   * @throws
   * - {BadRequestException} - 잘못된 입력 데이터
   * - {NotFoundException} - ParentNano를 찾을 수 없을 경우
   */
  async createNano(
    userId: string,
    param: WorkspaceParamDto,
    dto: CreateNanoDto,
  ) {
    const { workspaceId } = param;
    const { parentNanoId, type, title, content } = dto;

    // 1. 요청 사용자의 권한 검증
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    if (parentNanoId) {
      const parentNano = await this.prisma.nano.findUnique({
        where: { id: parentNanoId },
      });

      if (!parentNano) {
        throw new NotFoundException('지정한 부모 Nano를 찾을 수 없습니다.');
      }

      if (parentNano.workspaceId !== workspaceId) {
        throw new BadRequestException(
          '해당 Nano는 현재 워크스페이스에 존재하지 않습니다.',
        );
      }
    }

    const nanoId = `n-${createId()}`;
    const newNano = await this.prisma.nano.create({
      data: {
        id: nanoId,
        workspaceId,
        parentNanoId: parentNanoId ?? null,
        type,
        title: title ?? null,
        content: content ? content : undefined,
        writerId: userId,
      },
    });

    return {
      message: 'Nano 생성에 성공했습니다.',
      nanoId: newNano.id,
      workspaceId: newNano.workspaceId,
      parentNanoId: newNano.parentNanoId,
      type: newNano.type,
      title: newNano.title,
      content: newNano.content,
      createdAt: newNano.createdAt,
    };
  }

  /**
   * NANO-CORE-002
   * 최상위 Nano 목록 조회
   * @description
   * - 워크스페이스 인가를 거친 사용자가 해당 워크스페이스에 속한 Nano 목록 조회
   * @param userId - 사용자 ID (CUID)
   * @param param - Workspace 정보가 담긴 객체
   * @param query - Nano 목록 조회에 사용되는 DTO
   * @returns 조회 성공 메시지 및 Nano 목록 반환
   * @throws
   * - {ForbiddenException} - 워크스페이스에 소속되지 않은 사용자의 요청
   */
  async getRootNanos(
    userId: string,
    param: WorkspaceParamDto,
    query: NanoQueryDto,
  ) {
    const { workspaceId } = param;
    const { page, size } = query;

    await this.workspaceGuard.validateMembership(userId, workspaceId);

    const whereClause = {
      workspaceId,
      parentNanoId: null,
      deletedAt: null,
    };

    const [totalCount, nanos] = await Promise.all([
      this.prisma.nano.count({ where: whereClause }),
      this.prisma.nano.findMany({
        where: whereClause,
        skip: (page - 1) * size,
        take: size,
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          type: true,
          title: true,
          writerId: true,
          createdAt: true,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / size);

    return {
      message: 'Nano 목록 조회에 성공',
      totalCount,
      currentPage: page,
      totalPages: totalPages === 0 ? 1 : totalPages,
      nanoList: nanos.map((nano) => ({
        nanoId: nano.id,
        type: nano.type ?? 'PAGE',
        title: nano.title ?? '',
        createdAt: nano.createdAt,
      })),
    };
  }
}
