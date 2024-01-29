import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

export enum BaseExceptionCause {
  BAD_INPUT = 'BAD_INPUT',
  UNKNOWN = 'UNKNOWN',
  INTERNAL = 'INTERNAL',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
}
export class BaseException {
  cause: BaseExceptionCause;
  message: string | any;
  constructor(cause: BaseExceptionCause, message?: string | any) {
    this.cause = cause;
    this.message = message;
  }
}

export function mapExceptionToHttpStatus(
  exception: unknown,
): [HttpStatus, string] {
  if (exception instanceof HttpException) {
    return [exception.getStatus(), exception['response']['message']];
  }
  if (exception instanceof BaseException) {
    const cause = exception.cause;
    switch (cause) {
      case BaseExceptionCause.BAD_INPUT:
        return [HttpStatus.BAD_REQUEST, exception.message];

      case BaseExceptionCause.CONFLICT:
        return [HttpStatus.CONFLICT, exception.message];

      case BaseExceptionCause.INTERNAL:
        return [HttpStatus.INTERNAL_SERVER_ERROR, exception.message];

      case BaseExceptionCause.UNKNOWN:
        return [HttpStatus.INTERNAL_SERVER_ERROR, exception.message];

      case BaseExceptionCause.NOT_FOUND:
        return [HttpStatus.NOT_FOUND, exception.message];

      case BaseExceptionCause.PERMISSION_DENIED:
        return [HttpStatus.FORBIDDEN, exception.message];

      case BaseExceptionCause.UNAUTHENTICATED:
        return [HttpStatus.UNAUTHORIZED, exception.message];

      case BaseExceptionCause.UNAUTHORIZED:
        return [HttpStatus.UNAUTHORIZED, exception.message];

      default:
        return [HttpStatus.INTERNAL_SERVER_ERROR, exception.message || ''];
    }
  }

  return [HttpStatus.INTERNAL_SERVER_ERROR, ''];
}
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  mapExceptionToHttpStatus = mapExceptionToHttpStatus;

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    console.error('@error', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const [httpStatus, exceptionMessage] =
      this.mapExceptionToHttpStatus(exception);

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exceptionMessage,
    };

    response.status(httpStatus).json(responseBody);
  }
}
