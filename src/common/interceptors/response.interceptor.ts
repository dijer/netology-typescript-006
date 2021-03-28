import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        data,
      })),
      catchError((err) =>
        throwError(
          new InternalServerErrorException({
            status: 'fail',
            data: err.message,
          }),
        ),
      ),
    );
  }
}
