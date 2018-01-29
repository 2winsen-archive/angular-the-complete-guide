import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';

import {
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpSentEvent,
} from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../auth/auth.service';

@Injectable()
export class ParamsInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    console.log('intercepted!', req);
    return Observable.fromPromise(this.authService.getToken())
      .mergeMap((token: string) => {
        const clonedReq = req.clone({
          params: req.params.set('auth', token)
        });
        return next.handle(clonedReq);
      });
  }

}
