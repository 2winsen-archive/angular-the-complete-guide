import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import * as fromApp from './../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  signupUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => this.store.dispatch(new AuthActions.Signup()));
  }

  signinUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().onAuthStateChanged((currentUser: firebase.User) => {
          if (currentUser) {
            currentUser.getToken()
              .then(() => this.store.dispatch(new AuthActions.Signin()));
          }
        });
      });
  }

  getToken() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((currentUser: firebase.User) => {
        if (currentUser) {
          this.store.dispatch(new AuthActions.StoredTokenIsValid());
          resolve(currentUser.getIdToken());
        } else {
          this.store.dispatch(new AuthActions.StoredTokenIsInvalid());
          resolve(null);
        }
      });
    });
  }

  logout() {
    return firebase.auth().signOut()
      .then(() => {
        this.store.dispatch(new AuthActions.Logout());
      });
  }
}
