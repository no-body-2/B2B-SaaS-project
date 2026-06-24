// apps/api/src/common/filters/all-exceptions.filter.ts

/**
 * All Exceptions Filter
 *
 * @description
 * HTTP 예외 및 Prisma 데이터베이스 예외, 기타 런타임 예외를 통합 처리하는 전역 예외 필터
 *
 * @author  <Nobody>
 * @date 2026-06-24
 */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@b2b/database';

interface CustomRequest extends Request {
  user?: {
    userId?: string;
    email?: string;
  };
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  /**
   * 예외 Catch 및 처리
   *
   * @description
   * - 발생한 예외를 분석하여 클라이언트에게 규격화된 에러 응답을 전달
   * - 요청 메타데이터(IP, Method, URL, Body, User)를 포함하여 경고(4xx) 혹은 에러(5xx) 로그 생성
   *
   * @param exception - 발생한 예외 객체
   * @param host - 실행 콘텍스트 아규먼트 호스트
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<CustomRequest>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message =
      '서버 내부 오류가 발생했습니다. 문제가 지속되면 관리자에게 문의 바랍니다.';
    let errors: unknown = undefined;

    // 1. NestJS HttpException 처리
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (exceptionResponse && typeof exceptionResponse === 'object') {
        const resObj = exceptionResponse as Record<string, unknown>;
        const rawMessage = resObj.message;
        if (typeof rawMessage === 'string') {
          message = rawMessage;
        } else if (Array.isArray(rawMessage)) {
          message = rawMessage.join(', ');
        } else if (rawMessage !== undefined && rawMessage !== null) {
          if (typeof rawMessage === 'object') {
            message = JSON.stringify(rawMessage);
          } else if (
            typeof rawMessage === 'number' ||
            typeof rawMessage === 'boolean'
          ) {
            message = String(rawMessage);
          } else {
            message = '알 수 없는 에러 메시지 형식';
          }
        }
        errors = resObj.errors;
      }
    }
    // 2. Prisma 관련 예외 처리
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // Prisma 예외 발생 시 적절한 HTTP 상태코드 매핑
      switch (exception.code) {
        case 'P2002': // Unique constraint violation
          status = HttpStatus.CONFLICT;
          message = '이미 등록되었거나 중복된 데이터가 존재합니다.';
          errors = {
            target: exception.meta?.target,
          };
          break;
        case 'P2025': // Record to update not found
          status = HttpStatus.NOT_FOUND;
          message = '요청하신 데이터를 찾을 수 없습니다.';
          break;
        case 'P2003': // Foreign key constraint failed
          status = HttpStatus.CONFLICT;
          message =
            '데이터 참조 관계(외래키) 제약 조건 위반으로 작업을 처리할 수 없습니다.';
          errors = {
            field: exception.meta?.field_name,
          };
          break;
        default:
          status = HttpStatus.BAD_REQUEST;
          message = `데이터베이스 요청 오류가 발생했습니다. (코드: ${exception.code})`;
          break;
      }
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = '데이터베이스 입력 데이터 유효성 검증 실패 (잘못된 요청 형식)';
    } else if (
      exception &&
      typeof exception === 'object' &&
      'name' in exception &&
      (exception.name === 'PrismaClientUnknownRequestError' ||
        exception.name === 'PrismaClientInitializationError' ||
        exception.name === 'PrismaClientRustPanicError')
    ) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = '데이터베이스 작업 도중 예기치 않은 서버 오류가 발생했습니다.';
    }

    // 3. 응답 구조 통일
    const errorResponse = {
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      ...(errors ? { errors } : {}),
    };

    // 4. 로깅 데이터 생성 (민감 정보 마스킹)
    const maskedBody = request.body
      ? this.maskSensitiveData(request.body)
      : undefined;
    const userContext = request.user
      ? `[User: ${request.user.userId} (${request.user.email})]`
      : '[User: Anonymous]';

    const logMetadata = {
      ip: request.ip,
      userAgent: request.headers['user-agent'],
      query: Object.keys(request.query).length ? request.query : undefined,
      body:
        maskedBody && Object.keys(maskedBody as Record<string, unknown>).length
          ? maskedBody
          : undefined,
      errors,
    };

    // 5. 상태 코드별 차별화된 로깅
    if (status >= 500) {
      const errorStack =
        exception instanceof Error ? exception.stack : String(exception);
      this.logger.error(
        `[500 Internal Error] ${request.method} ${request.url} ${userContext} - ${message}\n` +
          `Metadata: ${JSON.stringify(logMetadata, null, 2)}\n` +
          `Stack: ${errorStack}`,
      );
    } else {
      this.logger.warn(
        `[${status} ${HttpStatus[status] || 'Client Warning'}] ${request.method} ${request.url} ${userContext} - ${message}\n` +
          `Metadata: ${JSON.stringify(logMetadata, null, 2)}`,
      );
    }

    // 6. 클라이언트 반환
    response.status(status).json(errorResponse);
  }

  /**
   * 요청 본문 민감 데이터 마스킹 처리
   *
   * @description
   * - 로그 노출 위험이 있는 비밀번호, 토큰 등의 값을 마스킹 처리
   *
   * @param data - 마스킹 가공을 거칠 원본 데이터 객체 또는 배열
   * @returns 마스킹 완료된 새로운 객체 또는 배열
   */
  private maskSensitiveData(data: unknown): unknown {
    if (!data) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.maskSensitiveData(item));
    }

    if (typeof data === 'object') {
      const obj = data as Record<string, unknown>;
      const result: Record<string, unknown> = {};
      const sensitiveKeys = [
        'password',
        'token',
        'accesstoken',
        'refreshtoken',
        'clientsecret',
        'secret',
      ];

      for (const [key, value] of Object.entries(obj)) {
        if (sensitiveKeys.includes(key.toLowerCase())) {
          result[key] = '********';
        } else if (value && typeof value === 'object') {
          result[key] = this.maskSensitiveData(value);
        } else {
          result[key] = value;
        }
      }
      return result;
    }

    return data;
  }
}
