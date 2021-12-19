import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, filter, finalize, tap } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  private count: number = 0;
  constructor(private service: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.count++;
    return next.handle(request).pipe(
      tap(() => this.service.show()),
      filter((event) => event instanceof HttpResponse),
      delay(500),
      finalize(() => {
        this.count--
        this.count == 0 && this.service.hide();
      })
    );
  }
}
