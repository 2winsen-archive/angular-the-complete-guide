import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import * as AuthActions from './auth/store/auth.actions';
import { Configs } from './configs';
import * as fromApp from './store/app.reducers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: Configs.FIREBASE_API_KEY,
      authDomain: Configs.FIREBASE_AUTH_DOMAIN
    });
    this.store.dispatch(new AuthActions.TryGetToken());
  }
}
