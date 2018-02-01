import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => action.payload)
    .switchMap((payload: { username: string, password: string }) =>
      Observable.fromPromise(firebase.auth().createUserWithEmailAndPassword(payload.username, payload.password)))
    .map(() => ({
      type: AuthActions.SIGNUP
    }));

  constructor(private actions$: Actions) { }
}
