import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {KeycloakService} from './auth/keycloak.service';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class KeycloakBearerInterceptor implements HttpInterceptor {
  constructor(private keycloak: KeycloakService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.keycloak.getToken()).pipe(mergeMap(token => {
      const kcReq = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
      return next.handle(kcReq);
    }))
  }
}
