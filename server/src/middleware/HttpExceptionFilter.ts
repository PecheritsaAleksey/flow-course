import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    //For logs you can use path with
    // path: httpAdapter.getRequestUrl(ctx.getRequest()),

    const responseBody =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            statusCode: 500,
            message: 'Internal server error',
          };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
