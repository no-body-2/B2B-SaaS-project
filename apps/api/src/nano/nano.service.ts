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
import { NanoChildParamDto } from './dto/child-nano-param.dto';
import { TargetNanoParamDto } from './dto/target-nano-param.dto';
import { UpdateNanoDto } from './dto/update-nano.dto';
import { MoveNanoDto } from './dto/move-nano.dto';

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
        throw new BadRequestException('해당 Nano에 접근할 수 없습니다.');
      }
    }

    // 2. ID 및 객체 생성
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
        orderBy: { createdAt: 'asc' },
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

      const isSubNano = await this.isChildNano(nanoId, targetParentNanoId);
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

    let targetOrderTime = new Date();

    if (prevNanoId) {
      const prevSibling = await this.prisma.nano.findUnique({
        where: { id: prevNanoId },
        select: { createdAt: true, workspaceId: true },
      });

      if (prevSibling && prevSibling.workspaceId === workspaceId) {
        targetOrderTime = new Date(prevSibling.createdAt.getTime() + 1);
      }
    } else {
      const firstSibling = await this.prisma.nano.findFirst({
        where: {
          workspaceId,
          parentNanoId: targetParentNanoId ?? null,
          deletedAt: null,
        },
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true },
      });

      if (firstSibling) {
        targetOrderTime = new Date(firstSibling.createdAt.getTime() - 1000);
      }
    }

    const movedNano = await this.prisma.nano.update({
      where: { id: nanoId },
      data: {
        parentNanoId: targetParentNanoId ?? null,
        createdAt: targetOrderTime,
      },
    });

    return {
      message: 'Nano 트리 위치 및 정렬 순서 변경 성공',
      nanoId: movedNano.id,
      parentNanoId: movedNano.parentNanoId,
      workspaceId: movedNano.workspaceId,
      orderedCreatedAt: movedNano.createdAt,
      movedAt: new Date(),
    };
  }

  /**
   * isChildNano
   * @description
   * - 트리 구조를 탐색하여 해당 Nano가 하위 Nano인지 확인
   */
  private async isChildNano(
    origin: string,
    targetParentNanoId: string,
  ): Promise<boolean> {
    let current = await this.prisma.nano.findUnique({
      where: { id: targetParentNanoId },
      select: { parentNanoId: true },
    });

    while (current && current.parentNanoId !== null) {
      if (current.parentNanoId === origin) {
        return true;
      }
      current = await this.prisma.nano.findUnique({
        where: { id: current.parentNanoId },
        select: { parentNanoId: true },
      });
    }
    return false;
  }
}
