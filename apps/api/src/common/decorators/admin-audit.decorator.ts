// apps/api/src/common/decorators/admin-audit.decorator.ts

/**
 * Admin Audit Decorator
 *
 * @description
 * - Decorator for Admin Audit Logging
 *
 * @author <nobody>
 * @date 2026-08-08 (International Cat Day! 🐱)
 */

import { SetMetadata } from '@nestjs/common';

export const ADMIN_AUDIT_KEY = 'adminAuditAction';

/**
 * 감사 로그 기록 액션의 이름을 지정하는 데코레이터
 * @example @AdminAudit('WORKSPACE_NAME_CHANGE')
 */
export const AdminAudit = (action: string) =>
  SetMetadata(ADMIN_AUDIT_KEY, action);
