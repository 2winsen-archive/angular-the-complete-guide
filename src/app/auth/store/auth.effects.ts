import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

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

  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignin) => action.payload)
    .switchMap((payload: { username: string, password: string }) =>
      Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(payload.username, payload.password)))
    .switchMap(() => Observable.create((observer: Observer<any>) => {
      firebase.auth().onAuthStateChanged((currentUser: firebase.User) => {
        if (currentUser) {
          observer.next(currentUser);
        }
      });
    }))
    .switchMap((currentUser: firebase.User) => Observable.fromPromise(currentUser.getIdToken()))
    .map((token: string) => {
      this.router.navigate(['/']);
      return {
        type: AuthActions.SIGNIN
      };
    });

  constructor(
    private actions$: Actions,
    private router: Router
  ) { }
}
