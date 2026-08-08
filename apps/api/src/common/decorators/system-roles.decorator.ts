// apps/api/src/common/decorators/system-roles.decorator.ts

/**
 * System Role Decorator
 *
 * @description
 * - Decorator for Super Admin (System Developer)
 *
 * @author <nobody>
 * @date 2026-08-08 (International Cat Day! 🐈)
 */

import { SetMetadata } from '@nestjs/common';

export const SYSTEM_ROLES_KEY = 'systemRoles';

/**
 * Super Admin 권한 지정을 위한 데코레이터
 * @example @SystemRoles('SUPER_ADMIN')
 */
export const SystemRoles = (...roles: string[]) =>
  SetMetadata(SYSTEM_ROLES_KEY, roles);
