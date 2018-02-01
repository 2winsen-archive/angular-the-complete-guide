import * as AuthActions from './auth.actions';

export interface State {
  authenticated: boolean;
  token: string;
}

const initialState: State = {
  authenticated: false,
  token: null
};

export function authReducer(state: State = initialState, action: AuthActions.AuthActions): State {
  switch (action.type) {
    case AuthActions.SIGNUP:
      return { ...state, authenticated: true };
    case AuthActions.SIGNIN:
    case AuthActions.STORED_TOKEN_IS_VALID:
      return {
        ...state,
        authenticated: true,
        token: (<AuthActions.StoredTokenIsValid>action).payload
      };
    case AuthActions.LOGOUT:
    case AuthActions.STORED_TOKEN_IS_INVALID:
      return {
        ...state,
        authenticated: false,
        token: null
      };
    default:
      return state;
  }
}
