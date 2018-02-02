import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';

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
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromAuth from './../auth/store/auth.reducers';
import * as fromApp from './../store/app.reducers';

@Injectable()
export class ParamsInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    console.log('intercepted!', req);
    return this.store.select('auth')
      .first()
      .map((state: fromAuth.State) => state.token)
      .switchMap((token: string) => {
        const clonedReq = req.clone({
          params: req.params.set('auth', token)
        });
        return next.handle(clonedReq);
      });
  }

}
