import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const STORED_TOKEN_IS_VALID = 'STORED_TOKEN_IS_VALID';
export const STORED_TOKEN_IS_INVALID = 'STORED_TOKEN_IS_INVALID';

export class Signup implements Action {
  readonly type: string = SIGNUP;
}

export class Signin implements Action {
  readonly type: string = SIGNIN;
}

export class StoredTokenIsValid implements Action {
  readonly type: string = STORED_TOKEN_IS_VALID;
}

export class StoredTokenIsInvalid implements Action {
  readonly type: string = STORED_TOKEN_IS_INVALID;
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export type AuthActions = Signup |
  Signin |
  Logout |
  StoredTokenIsValid |
  StoredTokenIsInvalid;
