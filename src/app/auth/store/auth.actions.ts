import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';

export class SignupUser implements Action {
  readonly type: string = SIGNUP;
}

export class SigninUser implements Action {
  readonly type: string = SIGNIN;
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export type AuthActions = SignupUser |
  SigninUser |
  Logout;
