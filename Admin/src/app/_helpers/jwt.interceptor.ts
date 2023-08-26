import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from 'src/enviroments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _AuthService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this._AuthService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = request.url.startsWith(`${environment.apiUrl}`);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
