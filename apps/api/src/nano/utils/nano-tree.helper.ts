// apps/api/src/nano/utils/nano-tree.helper.ts

/**
 * Nano Tree Hierarchy Helper
 * @description
 * - Nano 트리 구조에서 계층 및 순환 관리에 사용
 *
 * @author  <Nobody>
 * @date 2026-06-03
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NanoTreeHelper {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * isChildNano
   * @description
   * - 트리 구조를 탐색하여 해당 Nano가 하위 Nano인지 확인
   */
  async isChildNano(
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

  /**
   * getAllDescendants
   * @description
   * - 트리 구조에서 특정 Nano의 모든 하위 Nano ID를 재귀적으로 수집
   * @param parentNanoId
   * @param idList
   */
  async getAllDescendants(parentNanoId: string, idList: string[]) {
    const children = await this.prisma.nano.findMany({
      where: { parentNanoId: parentNanoId, deletedAt: null },
      select: { id: true },
    });

    idList.push(parentNanoId);

    for (const child of children) {
      idList.push(child.id);
      await this.getAllDescendants(child.id, idList);
    }
  }
}
