import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { ServerAuthService } from './server-auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private serverAuth: ServerAuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenizedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.serverAuth.getToken()}`
      }
    });
    return next.handle(tokenizedRequest);
  }
}
