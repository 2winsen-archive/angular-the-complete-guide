import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from './../../store/app.reducers';
import { AuthService } from './../auth.service';
import * as AuthActions from './../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignin({
      username: email,
      password: password
    }));
    // this.authService.signinUser(email, password)
    //   .then(response => this.router.navigate(['/']))
    //   .catch(error => {
    //     this.error = error,
    //     setTimeout(() => this.error = '', 3000);
    //   });
  }

}
