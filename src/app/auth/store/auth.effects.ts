import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
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
        } else {
          observer.error('no current user');
        }
      });
    }))
    .switchMap((currentUser: firebase.User) => Observable.fromPromise(currentUser.getIdToken()))
    .map((token: string) => {
      this.router.navigate(['/']);
      return {
        type: AuthActions.SIGNIN,
        payload: token
      };
    })
    .catch(error => this.failedToGetCurentUser());

  @Effect()
  logout = this.actions$
    .ofType(AuthActions.TRY_LOGOUT)
    .switchMap(() => Observable.fromPromise(firebase.auth().signOut()))
    .map((token: string) => {
      this.router.navigate(['/signin']);
      return {
        type: AuthActions.LOGOUT
      };
    });

  @Effect()
  tryGetToken = this.actions$
    .ofType(AuthActions.TRY_GET_TOKEN)
    .switchMap(() => Observable.create((observer: Observer<any>) =>
      firebase.auth().onAuthStateChanged((currentUser: firebase.User) => {
        if (currentUser) {
          observer.next(currentUser);
        } else {
          observer.error('no current user');
        }
      })
    ))
    .switchMap((currentUser: firebase.User) => Observable.fromPromise(currentUser.getIdToken()))
    .map((token: string) => {
      return {
        type: AuthActions.STORED_TOKEN_IS_VALID,
        payload: token
      };
    })
    .catch(error => this.failedToGetCurentUser());

  constructor(
    private actions$: Actions,
    private router: Router
  ) { }

  failedToGetCurentUser() {
    this.router.navigate(['/signin']);
    return Observable.of({
      type: AuthActions.STORED_TOKEN_IS_INVALID,
    });
  }
}
