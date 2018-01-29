import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from './../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select('auth')
      .map((authState: fromAuth.State) => authState.authenticated)
      .do((authenicated: boolean) => {
        if (!authenicated) {
          this.router.navigate(['/signin']);
        }
      });
  }

}
