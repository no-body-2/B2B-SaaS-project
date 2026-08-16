// apps/api/src/auth/utils/bitmasks.util.ts

/**
 * Bitmasks Utilities
 *
 * @description
 * - 시스템 내에서 빠른 연산을 위해 비트마스크 연산을 사용하기 위한 유틸리티
 *
 * @author <nobody>
 * @date 2026-08-16
 */

// Workspace Bitmask Permissions
export enum WorkspacePermission {
  NONE = 0,
  READ = 1 << 0, // 1 (000001)
  WRITE = 1 << 1, // 2 (000010)
  DELETE = 1 << 2, // 4 (000100)
  ADMIN = 1 << 3, // 8 (001000)
  MANAGE_MEMBER = 1 << 4, // 16 (010000)
  EXPORT = 1 << 5, // 32 (100000)

  // Role Presets
  MEMBER_PRESET = READ | WRITE, // 3
  MANAGER_PRESET = READ | WRITE | DELETE | MANAGE_MEMBER, // 23
  OWNER_PRESET = READ | WRITE | DELETE | ADMIN | MANAGE_MEMBER | EXPORT, // 63
}

export class BitmaskUtil {
  // 1. 특정 권한을 모두 보유하고 있는지 검사 (AND 연산)
  static hasPermission(userMask: number, requiredMask: number): boolean {
    if (requiredMask === (WorkspacePermission.NONE as number)) return true;
    return (userMask & requiredMask) === requiredMask;
  }

  // 2. 특정 권한 중 하나라도 보유하고 있는지 검사 (ANY 연산)
  static hasAnyPermission(userMask: number, requiredMask: number): boolean {
    return (userMask & requiredMask) !== 0;
  }

  // 3. 새로운 권한 추가 (OR 연산)
  static addPermission(userMask: number, permissionToAdd: number): number {
    return userMask | permissionToAdd;
  }

  // 4. 기존 권한 제거 (AND + NOT 연산)
  static removePermission(
    userMask: number,
    permissionToRemove: number,
  ): number {
    return userMask & ~permissionToRemove;
  }

  // 5. 권한 토글 (XOR 연산)
  static togglePermission(
    userMask: number,
    permissionToToggle: number,
  ): number {
    return userMask ^ permissionToToggle;
  }
}
