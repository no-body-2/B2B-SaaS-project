// apps/api/src/common/filters/all-exceptions.filter.spec.ts

/**
 * All Exceptions Filter Spec
 *
 * @description
 * AllExceptionsFilter에 대한 단위 테스트
 *
 * @author  <Nobody>
 * @date 2026-06-24
 */

import { AllExceptionsFilter } from './all-exceptions.filter';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@b2b/database';

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;
  let mockArgumentsHost: Partial<ArgumentsHost>;
  let mockHttpArgumentsHost: {
    getResponse: jest.Mock;
    getRequest: jest.Mock;
  };

  beforeEach(() => {
    filter = new AllExceptionsFilter();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    mockRequest = {
      url: '/test-url',
      method: 'POST',
      ip: '127.0.0.1',
      headers: {
        'user-agent': 'Jest-Test',
      },
      query: {},
      body: { password: 'secretpassword', name: 'John' },
    };

    mockHttpArgumentsHost = {
      getResponse: jest.fn().mockReturnValue(mockResponse),
      getRequest: jest.fn().mockReturnValue(mockRequest),
    };

    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue(mockHttpArgumentsHost),
    } as unknown as ArgumentsHost;
  });

  it('should format HttpException correctly and mask sensitive fields in request body', () => {
    const error = new HttpException('Validation error', HttpStatus.BAD_REQUEST);

    filter.catch(error, mockArgumentsHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        path: '/test-url',
        method: 'POST',
        message: 'Validation error',
      }),
    );
  });

  it('should map Prisma unique constraint error (P2002) to 409 Conflict', () => {
    const error = new Prisma.PrismaClientKnownRequestError(
      'Unique constraint violation',
      {
        code: 'P2002',
        clientVersion: '5.0.0',
        meta: { target: ['email'] },
      },
    );

    filter.catch(error, mockArgumentsHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.CONFLICT,
        message: '이미 등록되었거나 중복된 데이터가 존재합니다.',
        errors: { target: ['email'] },
      }),
    );
  });

  it('should map Prisma record not found error (P2025) to 404 Not Found', () => {
    const error = new Prisma.PrismaClientKnownRequestError('Record not found', {
      code: 'P2025',
      clientVersion: '5.0.0',
    });

    filter.catch(error, mockArgumentsHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.NOT_FOUND,
        message: '요청하신 데이터를 찾을 수 없습니다.',
      }),
    );
  });

  it('should map unknown errors to 500 Internal Server Error', () => {
    const error = new Error('Some unexpected error');

    filter.catch(error, mockArgumentsHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          '서버 내부 오류가 발생했습니다. 문제가 지속되면 관리자에게 문의 바랍니다.',
      }),
    );
  });
});
