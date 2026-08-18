// apps/api/src/common/guards/dfx-cycle.guard.ts

/**
 * DFS Cycle Detection Guard
 *
 * @description
 * - notion 등의 소프트웨어에서 Parent-Child 트리 이동 시 순환 참조(Circular Reference) 검증
 *
 * @author <nobody>
 * @date 2026-08-18
 */

import { BadRequestException } from '@nestjs/common';

export interface TreeNode {
  id: string;
  parentId: string | null;
}

export class DfxCycleGuard {
  // targetParentId가 sourceId의 하위 요소(Descendant)인지 DFS 탐색 검증
  static validateNoCycle(
    nodes: TreeNode[],
    sourceId: string,
    targetParentId: string | null,
  ): void {
    if (!targetParentId) return;

    if (sourceId === targetParentId) {
      throw new BadRequestException('자기 자신을 부모로 지정할 수 없습니다.');
    }

    // Parent-Child 관계 구축
    const childrenMap = new Map<string, string[]>();
    for (const node of nodes) {
      if (node.parentId) {
        const list = childrenMap.get(node.parentId) || [];
        list.push(node.id);
        childrenMap.set(node.parentId, list);
      }
    }

    // DFS 탐색으로 sourceId의 모든 후손 수집
    const descendants = new Set<string>();
    const stack: string[] = [sourceId];

    while (stack.length > 0) {
      const current = stack.pop()!;
      const children = childrenMap.get(current) || [];

      for (const childId of children) {
        if (!descendants.has(childId)) {
          descendants.add(childId);
          stack.push(childId);
        }
      }
    }

    // 이동하려는 Target Parent가 sourceId의 후손이라면 순환 참조 에러 발생
    if (descendants.has(targetParentId)) {
      throw new BadRequestException(
        '하위 자식 페이지 내부로 이동할 수 없습니다. (순환 참조 발생)',
      );
    }
  }
}
