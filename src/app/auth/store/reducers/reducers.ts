import { Action, createReducer, on } from '@ngrx/store';

import { IAuthState } from '../../types/authState.interface';
import {
  registerActions,
  registerFailureActions,
  registerSuccessActions,
} from '../actions/register.action';
import {
  loginActions,
  loginFailureActions,
  loginSuccessActions,
} from '@auth/store/actions/login.action';

const initialState: IAuthState = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

const authReducer = createReducer(
  initialState,
  on(registerActions, (state): IAuthState => {
    return {
      ...state,
      isSubmitting: true,
      validationErrors: null,
    };
  }),
  on(registerSuccessActions, (state, action): IAuthState => {
    return {
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    };
  }),
  on(registerFailureActions, (state, action): IAuthState => {
    return {
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    };
  }),

  //login
  on(loginActions, (state): IAuthState => {
    return {
      ...state,
      isSubmitting: true,
      validationErrors: null,
    };
  }),
  on(loginSuccessActions, (state, action): IAuthState => {
    return {
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    };
  }),
  on(loginFailureActions, (state, action): IAuthState => {
    return {
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    };
  }),
);

export function reducers(state: IAuthState, action: Action): IAuthState {
  return authReducer(state, action);
}
