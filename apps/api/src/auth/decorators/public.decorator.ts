// apps/api/src/auth/decorators/public.decorator.ts

/**
 * Public Custom Decorator
 *
 * @description
 * Public 접근을 허용하는 데코레이터
 *
 * @author <nobody>
 * @date 2026-05-21
 */

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
