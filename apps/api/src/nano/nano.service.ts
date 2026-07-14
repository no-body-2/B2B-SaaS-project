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

// TODO: workspaceGuard, workspaceParamDto 등 중복되는 부분을 별도의 유틸리티로 추출 - Finished
import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkspaceGuardService } from '../common/guard/workspace-guard.service';
import { NanoTreeHelper } from './utils/nano-tree.helper';
import { WorkspaceParamDto } from '../common/dto/workspace-param.dto';
import { CreateNanoDto } from './dto/create-nano.dto';
import { createId } from '@paralleldrive/cuid2';
import { NanoQueryDto } from './dto/nano-query.dto';
import { NanoChildParamDto } from './dto/child-nano-param.dto';
import { TargetNanoParamDto } from '../common/dto/target-nano-param.dto';
import { UpdateNanoDto } from './dto/update-nano.dto';
import { MoveNanoDto } from './dto/move-nano.dto';

@Injectable()
export class NanoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceGuard: WorkspaceGuardService,
    private readonly nanoTreeHelper: NanoTreeHelper,
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
        throw new BadRequestException('해당 Nano에 접근할 수 없습니다.');
      }
    }

    // 2. 최대 position값 조회하여 그 다음 값으로 설정
    const lastNano = await this.prisma.nano.findFirst({
      where: {
        workspaceId,
        parentNanoId: parentNanoId ?? null,
        deletedAt: null,
      },
      orderBy: [{ position: 'desc' }, { createdAt: 'desc' }],
      select: { position: true },
    });
    const nextPosition = lastNano ? lastNano.position + 1.0 : 0.0;

    // 3. ID 및 객체 생성
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
        position: nextPosition,
      },
    });

    // 3. 결과 반환
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
   * - 워크스페이스 인가를 거친 사용자가 해당 워크스페이스에 속한 최상위 Nano 목록 조회
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

    // 1. 권한 검증 및 검색 조건 설정
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    const whereClause = {
      workspaceId,
      parentNanoId: null,
      deletedAt: null,
    };

    // 2. 페이지네이션 및 조회
    const [totalCount, nanos] = await Promise.all([
      this.prisma.nano.count({ where: whereClause }),
      this.prisma.nano.findMany({
        where: whereClause,
        skip: (page - 1) * size,
        take: size,
        orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
        select: {
          id: true,
          type: true,
          title: true,
          writerId: true,
          createdAt: true,
        },
      }),
    ]);

    // 3. 총 페이지 수 계산
    const totalPages = Math.ceil(totalCount / size);

    // 4. 결과 반환
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

  /**
   * NANO-CORE-003
   * 하위 Nano 목록 조회
   * @description
   * - 워크스페이스 인가를 거친 사용자가 해당 워크스페이스에 속한 Nano 목록 조회
   * @param userId - 사용자 ID (CUID)
   * @param param - Workspace 정보가 담긴 객체
   * @param query - Nano 목록 조회에 사용되는 DTO
   * @returns 조회 성공 메시지 및 Nano 목록 반환
   * @throws
   * - {BadRequestException} - 유효하지 않은 요청 파라미터 (해당 Nano가 현재 워크스페이스 소속이 아님)
   * - {ForbiddenException} - 워크스페이스에 소속되지 않은 사용자의 요청
   * - {NotFoundException} - 해당하는 Parent Nano가 존재하지 않음
   */
  async getChildNanos(
    userId: string,
    param: NanoChildParamDto,
    query: NanoQueryDto,
  ) {
    const { workspaceId, parentNanoId } = param;
    const { page, size } = query;

    // 1. 권한 검증
    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // 2. Parent Nano 존재 여부 및 유효성 검증
    const parentNano = await this.prisma.nano.findUnique({
      where: { id: parentNanoId },
    });

    if (!parentNano || parentNano.deletedAt !== null) {
      throw new NotFoundException('지정한 부모 Nano를 찾을 수 없습니다.');
    }

    if (parentNano.workspaceId !== workspaceId) {
      throw new BadRequestException('해당 Nano에 접근할 수 없습니다.');
    }

    // 3. Where 조건 설정
    const whereClause = {
      workspaceId,
      parentNanoId,
      deletedAt: null,
    };

    // 4. 페이지네이션 및 조회
    const [totalCount, nanos] = await Promise.all([
      this.prisma.nano.count({ where: whereClause }),
      this.prisma.nano.findMany({
        where: whereClause,
        skip: (page - 1) * size,
        take: size,
        orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
        select: {
          id: true,
          type: true,
          title: true,
          createdAt: true,
        },
      }),
    ]);

    // 5. 총 페이지 수 계산
    const totalPages = Math.ceil(totalCount / size);

    // 6. 결과 반환
    return {
      message: '하위 Nano 목록 조회 성공',
      totalCount,
      currentPage: page,
      totalPages: totalPages === 0 ? 1 : totalPages,
      nanos: nanos.map((nano) => ({
        nanoId: nano.id,
        type: nano.type ?? 'PAGE',
        title: nano.title ?? '',
        createdAt: nano.createdAt,
      })),
    };
  }

  /**
   * NANO-CORE-004
   * Nano 상세 조회
   * @description
   * - 워크스페이스 인가를 거친 사용자가 해당 워크스페이스에 속한 Nano 상세 조회
   * @param userId - 사용자 ID (CUID)
   * @param param - Workspace 정보가 담긴 객체
   * @returns 조회 성공 메시지 및 Nano 상세 정보 반환
   * @throws
   * - {BadRequestException} - 유효하지 않은 요청 파라미터 (해당 Nano가 현재 워크스페이스 소속이 아님)
   * - {ForbiddenException} - 워크스페이스에 소속되지 않은 사용자의 요청
   * - {NotFoundException} - 해당하는 Parent Nano가 존재하지 않음
   */
  async getNanoDetail(userId: string, param: TargetNanoParamDto) {
    const { workspaceId, nanoId } = param;

    await this.workspaceGuard.validateMembership(userId, workspaceId);

    // 1. Nano 추출
    const nano = await this.prisma.nano.findUnique({
      where: { id: nanoId },
    });

    // 2. Nano 존재 여부 확인
    if (!nano || nano.deletedAt !== null) {
      throw new NotFoundException('해당하는 Nano가 존재하지 않습니다.');
    }

    // 3. Nano 소속 워크스페이스 확인
    if (nano.workspaceId !== workspaceId) {
      throw new BadRequestException('해당 Nano에 접근할 수 없습니다.');
    }

    // 4. 결과 반환
    return {
      message: 'Nano 상세 조회 성공',
      nanoId: nano.id,
      workspaceId: nano.workspaceId,
      parentNanoId: nano.parentNanoId,
      type: nano.type ?? 'PAGE',
      title: nano.title ?? '',
      content: nano.content,
      writerId: nano.writerId,
      createdAt: nano.createdAt,
      updatedAt: nano.updatedAt,
    };
  }

  /**
   * NANO-CORE-005
   * Nano 수정 요청
   * @description
   * - 워크스페이스 인가를 거친 사용자가 해당 워크스페이스에 속한 Nano 수정
   * @remarks
   * - 즉시 수정 권한은 해당 Nano의 작성자나 관리자만이 가짐
   * - 타 사용자 (MEMBER) 권한의 사용자가 수정 시 Approval Request로 넘어감
   * @param userId - 사용자 ID (CUID)
   * @param param - 해당 Nano 정보가 담긴 객체
   * @param dto - Nano 수정 정보가 담긴 객체
   * @returns 수정 성공 메시지 및 Nano 상세 정보 반환
   * @throws
   * - {BadRequestException} - 유효하지 않은 요청 파라미터 (해당 Nano가 현재 워크스페이스 소속이 아님)
   * - {ForbiddenException} - 워크스페이스에 소속되지 않은 사용자의 요청
   * - {NotFoundException} - 해당하는 Parent Nano가 존재하지 않음
   */
  async updateNano(
    userId: string,
    param: TargetNanoParamDto,
    dto: UpdateNanoDto,
  ) {
    const { workspaceId, nanoId } = param;
    const { title, content } = dto;

    // 1. 사용자 워크스페이스 소속 여부 검사
    const membership = await this.workspaceGuard.validateMembership(
      userId,
      workspaceId,
    );

    // 1-1. 사용자 권한 확인
    const userRole = membership.role ?? 'MEMBER';

    // 2. 수정 대상 Nano 조회
    const targetNano = await this.prisma.nano.findUnique({
      where: { id: nanoId },
    });

    if (!targetNano || targetNano.deletedAt !== null) {
      throw new NotFoundException('해당 Nano가 존재하지 않습니다.');
    }

    if (targetNano.workspaceId !== workspaceId) {
      throw new BadRequestException('해당 Nano에 접근할 수 없습니다.');
    }

    // 왜 FindUnique는 안되는건가
    // 3. 결재 상태 여부 확인
    const isPending = await this.prisma.pendingNano.findFirst({
      where: { nanoId },
    });

    if (isPending) {
      throw new BadRequestException('이미 결재 요청이 진행 중입니다.');
    }

    return this.prisma.$transaction(async (tx) => {
      const historyId = `h-${createId()}`;
      const newHistory = await tx.nanoHistory.create({
        data: {
          id: historyId,
          nanoId,
          title: title ?? targetNano.title,
          content: content ? content : (targetNano.content ?? undefined),
          writerId: userId,
          workspaceId,
          // TODO: Version의 기준을 명확히 정립할 것, 현재는 타임스탬프 기반으로 사용
          version: `v-${Date.now()}`,
        },
      });

      // 4-A. 요청 사용자가 OWNER or ADMIN인 경우 즉시 수정
      if (userRole === 'OWNER' || userRole === 'ADMIN') {
        const updatedNano = await tx.nano.update({
          where: { id: nanoId },
          data: {
            title: title ?? undefined,
            content: content ?? undefined,
          },
        });

        return {
          message: '관리자 권한으로 Nano 즉시 수정이 완료되었습니다.',
          status: 'APPROVED',
          nanoId: updatedNano.id,
          title: updatedNano.title,
          content: updatedNano.content,
          historyId: newHistory.id,
        };
      }

      // 4-B. 요청 사용자가 일반 사용자인 경우 결재 요청 생성
      const approvalId = `a-${createId()}`;

      await tx.approvalRequest.create({
        data: {
          id: approvalId,
          nanoId,
          historyId,
          status: 'PENDING',
        },
      });

      await tx.pendingNano.create({
        data: {
          approvalId,
          nanoId,
        },
      });

      return {
        message:
          'Nano 수정 요청이 전달되었습니다. 관리자의 승인을 기다려주세요.',
        status: 'PENDING',
        nanoId,
        historyId: newHistory.id,
        approvalId,
      };
    });
  }

  // TODO: 선 낙관적 업데이트 후 백엔드 및 WebSocket 반영 및 전체 트랜젝션 화 메서드로 api/v2 에서 전체를 갈아 엎을 것
  /**
   * NANO-CORE-006
   * Nano 위치 수정
   * @description
   * - 워크스페이스의 최고 관리자가 Nano의 위치를 수정
   * @remarks
   * - 위치 수정 권한은 해당 워크스페이스의 OWNER 권한을 가진 사용자만이 가짐
   * @param userId - 사용자 ID (CUID)
   * @param param - 해당 Nano 정보가 담긴 객체
   * @param dto - Nano 수정 정보가 담긴 객체
   * @returns 수정 성공 메시지 및 Nano 상세 정보 반환
   * @throws
   * - {BadRequestException} - 유효하지 않은 요청 파라미터 (해당 Nano가 현재 워크스페이스 소속이 아님)
   * - {ForbiddenException} - 워크스페이스에 소속되지 않은 사용자의 요청
   * - {NotFoundException} - 해당하는 Parent Nano가 존재하지 않음
   */
  async moveNano(userId: string, param: TargetNanoParamDto, dto: MoveNanoDto) {
    const { workspaceId, nanoId } = param;
    const { targetParentNanoId, prevNanoId } = dto;

    // 1. api/v1에서는 OWNER 권한의 사용자만 위치 수정 권한이 부여됨
    await this.workspaceGuard.verifyWorkspaceOwner(userId, workspaceId);

    const currentNano = await this.prisma.nano.findUnique({
      where: { id: nanoId },
    });

    if (!currentNano || currentNano.deletedAt !== null) {
      throw new NotFoundException('해당하는 Nano가 존재하지 않습니다.');
    }

    if (currentNano.workspaceId !== workspaceId) {
      throw new BadRequestException('해당 Nano에 접근할 수 없습니다.');
    }

    if (targetParentNanoId) {
      if (nanoId === targetParentNanoId) {
        throw new BadRequestException('자신을 상위 Nano로 설정할 수 없습니다.');
      }

      const isSubNano = await this.nanoTreeHelper.isChildNano(
        nanoId,
        targetParentNanoId,
      );
      if (isSubNano) {
        throw new BadRequestException('자신의 하위 Nano로 이동할 수 없습니다.');
      }

      const targetParent = await this.prisma.nano.findUnique({
        where: { id: targetParentNanoId },
      });

      if (!targetParent) {
        throw new NotFoundException('상위 Nano가 존재하지 않습니다.');
      }

      if (targetParent.workspaceId !== workspaceId) {
        throw new BadRequestException(
          '상위 Nano가 현재 워크스페이스에 속하지 않습니다.',
        );
      }
    }

    let targetPosition = 0.0;

    if (prevNanoId) {
      // 이전 형제 조회
      const prevSibling = await this.prisma.nano.findUnique({
        where: { id: prevNanoId },
        select: { position: true, workspaceId: true },
      });

      if (prevSibling && prevSibling.workspaceId === workspaceId) {
        // 이전 형제 다음의 형제 조회 (이동 후 다음 형제)
        const nextSibling = await this.prisma.nano.findFirst({
          where: {
            workspaceId,
            parentNanoId: targetParentNanoId ?? null,
            deletedAt: null,
            position: { gt: prevSibling.position },
          },
          orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
          select: { position: true },
        });

        if (nextSibling) {
          targetPosition = (prevSibling.position + nextSibling.position) / 2.0;
        } else {
          targetPosition = prevSibling.position + 1.0;
        }
      }
    } else {
      // 맨 앞으로 이동하는 경우
      const firstSibling = await this.prisma.nano.findFirst({
        where: {
          workspaceId,
          parentNanoId: targetParentNanoId ?? null,
          deletedAt: null,
        },
        orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
        select: { position: true },
      });

      if (firstSibling) {
        targetPosition = firstSibling.position - 1.0;
      } else {
        targetPosition = 0.0;
      }
    }

    const movedNano = await this.prisma.nano.update({
      where: { id: nanoId },
      data: {
        parentNanoId: targetParentNanoId ?? null,
        position: targetPosition,
      },
    });

    return {
      message: 'Nano 트리 위치 및 정렬 순서 변경 성공',
      nanoId: movedNano.id,
      parentNanoId: movedNano.parentNanoId,
      workspaceId: movedNano.workspaceId,
      position: movedNano.position,
      movedAt: new Date(),
    };
  }

  // TODO: 6/4 Swagger Test 필요
  /**
   * NANO-CORE-007
   * Nano 삭제 (Soft Delete)
   * @description
   * - 워크스페이스의 OWNER 혹은 Nano의 작성자가 해당 Nano를 삭제
   * @remarks
   * - 삭제는 Soft Delete 방식으로 30일의 복구 가능 기간을 부여
   * @param userId - 사용자 ID (CUID)
   * @param param - 해당 Nano 정보가 담긴 객체
   * @returns 삭제 성공 메시지
   * @throws
   * - {BadRequestException} - 유효하지 않은 요청 파라미터 (해당 Nano가 현재 워크스페이스 소속이 아님)
   * - {ForbiddenException} - 워크스페이스에 소속되지 않은 사용자의 요청
   * - {NotFoundException} - 해당하는 Parent Nano가 존재하지 않음
   */
  async deleteNano(userId: string, param: TargetNanoParamDto) {
    const { workspaceId, nanoId } = param;

    const membership = await this.workspaceGuard.validateMembership(
      userId,
      workspaceId,
    );

    const targetNano = await this.prisma.nano.findUnique({
      where: { id: nanoId },
    });

    if (!targetNano || targetNano.deletedAt !== null) {
      throw new NotFoundException(
        '이미 삭제되었거나 존재하지 않는 Nano입니다.',
      );
    }

    if (targetNano.workspaceId !== workspaceId) {
      throw new BadRequestException('해당 Nano에 접근할 수 없습니다.');
    }

    if (membership.role !== 'OWNER' && targetNano.writerId !== userId) {
      throw new ForbiddenException('해당 Nano를 삭제할 권한이 없습니다.');
    }

    if (membership.role === 'OWNER' || targetNano.writerId === userId) {
      const allDescendants: string[] = [];
      await this.nanoTreeHelper.getAllDescendants(nanoId, allDescendants);

      const targetsToDelete = [nanoId, ...allDescendants];

      await this.prisma.$transaction(async (tx) => {
        await tx.nano.updateMany({
          where: {
            id: {
              in: targetsToDelete,
            },
            workspaceId,
          },
          data: {
            deletedAt: new Date(),
          },
        });
      });

      return {
        message: 'Nano 삭제 성공 (30일 후 영구 삭제)',
        deletedRootNanoId: nanoId,
        totalDeleted: targetsToDelete.length,
        deletedAt: new Date(),
      };
    }
  }

  /**
   * NANO-CORE-008
   * Nano 복구 (Soft Delete 복구)
   * @description
   * - 워크스페이스의 OWNER 혹은 Nano의 작성자가 삭제된 Nano 및 그 하위 문서들을 복구
   * @param userId - 사용자 ID (CUID)
   * @param param - 대상 Nano 정보가 담긴 객체
   * @returns 복구 성공 메시지
   */
  async restoreNano(userId: string, param: TargetNanoParamDto) {
    const { workspaceId, nanoId } = param;

    const membership = await this.workspaceGuard.validateMembership(
      userId,
      workspaceId,
    );

    const targetNano = await this.prisma.nano.findUnique({
      where: { id: nanoId },
    });

    if (!targetNano) {
      throw new NotFoundException('존재하지 않는 Nano입니다.');
    }

    if (targetNano.deletedAt === null) {
      throw new BadRequestException(
        '이미 복구되었거나 삭제되지 않은 Nano입니다.',
      );
    }

    if (targetNano.workspaceId !== workspaceId) {
      throw new BadRequestException('해당 Nano에 접근할 수 없습니다.');
    }

    if (membership.role !== 'OWNER' && targetNano.writerId !== userId) {
      throw new ForbiddenException('해당 Nano를 복구할 권한이 없습니다.');
    }

    // 복구할 모든 하위 후손 ID들을 구합니다 (includeDeleted = true).
    const allDescendants: string[] = [];
    await this.nanoTreeHelper.getAllDescendants(nanoId, allDescendants, true);

    const targetsToRestore = [nanoId, ...allDescendants];

    await this.prisma.$transaction(async (tx) => {
      await tx.nano.updateMany({
        where: {
          id: {
            in: targetsToRestore,
          },
          workspaceId,
        },
        data: {
          deletedAt: null,
        },
      });
    });

    return {
      message: 'Nano 복구 성공',
      restoredRootNanoId: nanoId,
      totalRestored: targetsToRestore.length,
    };
  }

  /**
   * NANO-CORE-009
   * 삭제된 Nano 목록 조회
   * @description
   * - 워크스페이스 내에서 삭제(Soft Delete)된 Nanos 문서들의 목록을 조회
   * @param userId - 사용자 ID (CUID)
   * @param param - 워크스페이스 식별자
   * @returns 삭제된 Nano 문서 목록
   */
  async listDeletedNanos(userId: string, param: WorkspaceParamDto) {
    const { workspaceId } = param;

    await this.workspaceGuard.validateMembership(userId, workspaceId);

    const deletedNanos = await this.prisma.nano.findMany({
      where: {
        workspaceId,
        deletedAt: { not: null },
      },
      orderBy: {
        deletedAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        content: true,
        parentNanoId: true,
        deletedAt: true,
      },
    });

    return deletedNanos;
  }
}
