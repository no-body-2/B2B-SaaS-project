// apps/api/src/common/interceptors/logging.interceptor.ts

/**
 * Logging Interceptor
 * 
 * @description
 * - Logging Interceptor for Winston
 * 
 * @author <nobody>
 * @date 2026-08-06
 */

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

interface CustomRequest extends Request {
    user?: {
        userId?: string;
        email?: string;
    };
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<CustomRequest>();
        const response = ctx.getResponse<Response>();


        const { method, originalUrl, ip } = request;
        const userAgent = request.get('user-agent') || '';
        const now = Date.now();

        return next.handle().pipe(
            tap(() => {
                const statusCode = response.statusCode;
                const delay = Date.now() - now;

                const userContext = request.user ? `[User: ${request.user.userId} (${request.user.email})]` : '[User: Anonymous]';

                this.logger.log(
                    `${method} ${originalUrl} ${statusCode} + ${delay}ms - IP: ${ip} ${userContext} "${userAgent}"`,
                );
            }),
        );
    }
}
