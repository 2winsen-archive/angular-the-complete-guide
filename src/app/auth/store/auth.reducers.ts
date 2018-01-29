import * as AuthActions from './auth.actions';

export interface State {
  authenticated: boolean;
}

const initialState: State = {
  authenticated: false
};

export function authReducer(state: State = initialState, action: AuthActions.AuthActions): State {
  switch (action.type) {
    case AuthActions.SIGNUP:
    case AuthActions.SIGNIN:
    case AuthActions.STORED_TOKEN_IS_VALID:
      return { ...state, authenticated: true };
    case AuthActions.LOGOUT:
    case AuthActions.STORED_TOKEN_IS_INVALID:
      return { ...state, authenticated: false };
    default:
      return state;
  }
}
