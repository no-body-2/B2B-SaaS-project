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
  constructor(private prisma: PrismaService) {}

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
}
