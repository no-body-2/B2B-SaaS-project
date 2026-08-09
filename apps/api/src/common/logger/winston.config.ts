// apps/api/src/common/logger/winston.config.ts

/**
 * Winston Logger Config
 *
 * @description
 * - Winston Config TypeScript File
 *
 * @author <nobody>
 * @date 2026-08-06
 */

import * as path from 'path';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { appConfig } from '../config/app.config';

// 1. Common Log File Rolling Options (Max: 20mb, 14 to 30days, gzipped)
const dailyRotateFileOptions = (
  level: string,
  filename: string,
  maxFiles: string,
) => {
  return new DailyRotateFile({
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: path.join(process.cwd(), 'logs', filename),
    filename: `%DATE%.${filename}.log`,
    maxSize: '20m',
    maxFiles,
    zippedArchive: true,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.json(),
    ),
  });
};

// 2. Winston Logger Instance Create Function
export const createWinstonLogger = () => {
  const isProd = appConfig.isProduction;

  return winston.createLogger({
    level: isProd ? 'info' : 'debug',
    transports: [
      // 2-1. Console Print Options
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('LumiNanoAPI', {
            colors: !isProd,
            prettyPrint: true,
          }),
        ),
      }),

      // 2-2. Error Log File Options (30days rotation)
      dailyRotateFileOptions('warn', 'error', '30d'),

      // 2-3. HTTP Access Log File Options (14days rotation)
      dailyRotateFileOptions('info', 'access', '14d'),

      // 2-4. Combined Log File Options (14days rotation)
      dailyRotateFileOptions('info', 'combined', '14d'),
    ],
  });
};
