import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import ls from 'localstorage-slim';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token : string = ls.get('id_token', { decrypt: true });
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `jwt ${token}`
        }
      });
    }
    
    
    return next.handle(request);
  }
}
