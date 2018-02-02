import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';
export const TRY_LOGOUT = 'TRY_LOGOUT';
export const LOGOUT = 'LOGOUT';
export const TRY_GET_TOKEN = 'TRY_GET_TOKEN';
export const STORED_TOKEN_IS_VALID = 'STORED_TOKEN_IS_VALID';
export const STORED_TOKEN_IS_INVALID = 'STORED_TOKEN_IS_INVALID';

export class TrySignup implements Action {
  readonly type: string = TRY_SIGNUP;
  constructor(public payload: { username: string, password: string }) { }
}

export class Signup implements Action {
  readonly type: string = SIGNUP;
}

export class TrySignin implements Action {
  readonly type: string = TRY_SIGNIN;
  constructor(public payload: { username: string, password: string }) { }
}

export class Signin implements Action {
  readonly type: string = SIGNIN;
  constructor(public payload: string) { }
}

export class SigninError implements Action {
  readonly type: string = SIGNIN_ERROR;
  constructor(public payload: string) { }
}

export class StoredTokenIsValid implements Action {
  readonly type: string = STORED_TOKEN_IS_VALID;
  constructor(public payload: string) { }
}

export class StoredTokenIsInvalid implements Action {
  readonly type: string = STORED_TOKEN_IS_INVALID;
}

export class TryLogout implements Action {
  readonly type: string = TRY_LOGOUT;
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export class TryGetToken implements Action {
  readonly type: string = TRY_GET_TOKEN;
}

export type AuthActions = Signup |
  Signin |
  Logout |
  StoredTokenIsValid |
  StoredTokenIsInvalid |
  TrySignin |
  TrySignup |
  TryLogout |
  TryGetToken |
  SigninError;
