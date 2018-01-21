import 'rxjs/Rx';

import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class AuthService {
  private authenticated = new Subject<boolean>();
  private authenticated$ = this.authenticated.asObservable();

  signupUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signinUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().onAuthStateChanged((currentUser: firebase.User) => {
          if (currentUser) {
            currentUser.getToken()
              .then(() => this.authenticated.next(true));
          }
        });
      });
  }

  getToken() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((currentUser: firebase.User) => {
        if (currentUser) {
          this.authenticated.next(true);
          resolve(currentUser.getToken());
        } else {
          this.authenticated.next(false);
          resolve(null);
        }
      });
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticated$;
  }

  logout() {
    firebase.auth().signOut()
      .then(() => this.authenticated.next(false));
  }
}
