// apps/api/src/auth/bitmask-acl.spec.ts

/**
 * Bitmask ACL Unit Test
 *
 * @description
 * - BitmaskUtil의 비트 연산자(AND, OR, AND~, XOR) 검증 테스트
 *
 * @author <nobody>
 * @date 2026-08-16
 */

import { BitmaskUtil, WorkspacePermission } from './utils/bitmasks.util';

describe('Bitmask ACL Unit Test', () => {
  it('1. MEMBER_PRESET(READ|WRITE)은 READ와 WRITE 권한을 포함해야 한다.', () => {
    const userMask = WorkspacePermission.MEMBER_PRESET;

    expect(BitmaskUtil.hasPermission(userMask, WorkspacePermission.READ)).toBe(
      true,
    );
    expect(BitmaskUtil.hasPermission(userMask, WorkspacePermission.WRITE)).toBe(
      true,
    );
    expect(
      BitmaskUtil.hasPermission(userMask, WorkspacePermission.DELETE),
    ).toBe(false);
  });

  it('2. 기존 권한에 DELETE 권한을 추가(OR)하면 DELETE 권한이 정상 부여되어야 한다.', () => {
    let userMask = WorkspacePermission.READ | WorkspacePermission.WRITE;
    userMask = BitmaskUtil.addPermission(userMask, WorkspacePermission.DELETE);

    expect(
      BitmaskUtil.hasPermission(userMask, WorkspacePermission.DELETE),
    ).toBe(true);
    expect(userMask).toBe(
      WorkspacePermission.READ |
        WorkspacePermission.WRITE |
        WorkspacePermission.DELETE,
    );
  });

  it('3. 기존 권한에서 WRITE 권한을 제거(AND ~)하면 WRITE 권한만 비활성화되어야 한다.', () => {
    let userMask =
      WorkspacePermission.READ |
      WorkspacePermission.WRITE |
      WorkspacePermission.DELETE;
    userMask = BitmaskUtil.removePermission(
      userMask,
      WorkspacePermission.WRITE,
    );

    expect(BitmaskUtil.hasPermission(userMask, WorkspacePermission.READ)).toBe(
      true,
    );
    expect(BitmaskUtil.hasPermission(userMask, WorkspacePermission.WRITE)).toBe(
      false,
    );
    expect(
      BitmaskUtil.hasPermission(userMask, WorkspacePermission.DELETE),
    ).toBe(true);
  });

  it('4. 토글(XOR) 연산 시 권한이 반전되어야 한다.', () => {
    let userMask = WorkspacePermission.READ;

    // 켜기
    userMask = BitmaskUtil.togglePermission(
      userMask,
      WorkspacePermission.ADMIN,
    );
    expect(BitmaskUtil.hasPermission(userMask, WorkspacePermission.ADMIN)).toBe(
      true,
    );

    // 끄기
    userMask = BitmaskUtil.togglePermission(
      userMask,
      WorkspacePermission.ADMIN,
    );
    expect(BitmaskUtil.hasPermission(userMask, WorkspacePermission.ADMIN)).toBe(
      false,
    );
  });

  it('5. NONE 권한 검사 시 항상 true를 반환해야 한다.', () => {
    const userMask = WorkspacePermission.NONE;

    expect(BitmaskUtil.hasPermission(userMask, WorkspacePermission.NONE)).toBe(
      true,
    );
  });
});
