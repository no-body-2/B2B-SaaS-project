// apps/api/src/common/decorators/sudo-mode.decorator.ts

/**
 * Sudo Mode Decorator
 *
 * @description
 * - Decorator for Super Admin (System Developer)
 *
 * @author <nobody>
 * @date 2026-08-08 (International Cat Day! 🐈‍⬛)
 */

import { SetMetadata } from '@nestjs/common';

export const IS_SUDO_MODE_KEY = 'isSudoMode';

/**
 * 민감 작업 시 일정 시간 내 비밀번호 재인증을 요구
 * @example @SudoMode()
 */
export const SudoMode = () => SetMetadata(IS_SUDO_MODE_KEY, true);
