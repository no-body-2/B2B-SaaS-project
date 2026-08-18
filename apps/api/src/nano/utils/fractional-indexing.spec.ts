// apps/api/src/nano/utils/fractional-indexing.spec.ts

/**
 * Fractional Indexing & DFS Cycle Guard Unit Test
 *
 * @description
 * - Lexicographical Fractional Indexing 중간값 연산 및 DFS 순환 탐색 검증
 *
 * @author <nobody>
 * @date 2026-08-18
 */

import { FractionalIndexingUtil } from './fractional-indexing.util';
import { DfxCycleGuard, TreeNode } from '../../common/guards/dfs-cycle.guard';

describe('Fractional Indexing & DFS Cycle Guard Test', () => {
  describe('FractionalIndexingUtil', () => {
    it('1. prev와 next가 모두 null일 경우 기본 기준값 a0를 반환해야 한다.', () => {
      const pos = FractionalIndexingUtil.generatePosition(null, null);
      expect(pos).toBe('a0');
    });

    it('2. prev와 next 사이의 중간 positionStr을 정확히 보간해야 한다.', () => {
      const mid = FractionalIndexingUtil.generatePosition('a0', 'a2');
      expect(mid).toBe('a1');
      expect('a0' < mid && mid < 'a2').toBe(true);
    });

    it('3. 연속된 문자인 경우 자릿수를 확장하여 V 중간값을 생성해야 한다.', () => {
      const mid = FractionalIndexingUtil.generatePosition('a0', 'a1');
      expect('a0' < mid && mid < 'a1').toBe(true);
      expect(mid).toBe('a0V');
    });

    it('4. 맨 앞으로 이동 시 (prev=null, next=a0) 자릿수를 감소시킨 사전순 빠른 문자열을 생성해야 한다.', () => {
      const pos = FractionalIndexingUtil.generatePosition(null, 'a0');
      expect(pos < 'a0').toBe(true);
    });

    it('5. 맨 뒤로 이동 시 (prev=a0, next=null) 사전순으로 뒤따르는 문자열을 생성해야 한다.', () => {
      const pos = FractionalIndexingUtil.generatePosition('a0', null);
      expect(pos > 'a0').toBe(true);
      expect(pos).toBe('a1');
    });

    it('6. prev >= next 일 경우 예외를 발생시켜야 한다.', () => {
      expect(() =>
        FractionalIndexingUtil.generatePosition('a2', 'a0'),
      ).toThrow();
    });
  });

  describe('DfxCycleGuard (DFS Cycle Prevention)', () => {
    const sampleNodes: TreeNode[] = [
      { id: 'root-1', parentId: null },
      { id: 'child-1', parentId: 'root-1' },
      { id: 'grandchild-1', parentId: 'child-1' },
    ];

    it('7. 정상적인 부모 이동 시 에러가 발생하지 않아야 한다.', () => {
      expect(() =>
        DfxCycleGuard.validateNoCycle(sampleNodes, 'grandchild-1', 'root-1'),
      ).not.toThrow();
    });

    it('8. 자기 자신을 부모로 지정하려 하면 BadRequestException을 발생시켜야 한다.', () => {
      expect(() =>
        DfxCycleGuard.validateNoCycle(sampleNodes, 'child-1', 'child-1'),
      ).toThrow('자기 자신을 부모로 지정할 수 없습니다.');
    });

    it('9. 부모 노드를 자신의 하위 자식 노드 내부로 이동하려 하면 순환 참조 예외를 발생시켜야 한다.', () => {
      // root-1을 자신의 손자 grandchild-1 내부로 이동 시도 -> 순환 에러
      expect(() =>
        DfxCycleGuard.validateNoCycle(sampleNodes, 'root-1', 'grandchild-1'),
      ).toThrow('하위 자식 페이지 내부로 이동할 수 없습니다. (순환 참조 발생)');
    });
  });
});
