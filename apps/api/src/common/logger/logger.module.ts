// apps/api/src/common/logger/logger.module.ts

/**
 * Logger Module
 * 
 * @description
 * - Logger (Winston) Module
 * 
 * @author <nobody>
 * @date 2026-08-06
 */

import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { createWinstonLogger } from './winston.config';

@Global()
@Module({
    imports: [WinstonModule.forRoot({
        instance: createWinstonLogger(),
    }),
    ],
})
export class LoggerModule {}
