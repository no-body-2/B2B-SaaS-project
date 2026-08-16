// apps/api/src/common/decorators/require-permissions.decorator.ts

/**
 * Require Permission Decorator
 *
 * @description
 * - 권한 제어를 위한 데코레이터
 *
 * @author <nobody>
 * @date 2026-08-16
 */

import { SetMetadata } from '@nestjs/common';
import { WorkspacePermission } from '../../auth/utils/bitmasks.util';

export const PERMISSIONS_KEY = 'require_permissions';

export const RequirePermissions = (...permissions: WorkspacePermission[]) => {
  const combinedMask = permissions.reduce((acc, mask) => acc | mask, 0);
  return SetMetadata(PERMISSIONS_KEY, combinedMask);
};
