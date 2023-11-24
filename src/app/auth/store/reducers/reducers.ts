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
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccess,
} from '@auth/store/actions/user.action';
import { updateCurrentUserSuccessActions } from '@auth/store/actions/update-current-user.action';
import { logoutAction } from '@auth/store/actions/sync.action';

const initialState: IAuthState = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

const authReducer = createReducer(
  initialState,
  on(
    registerActions,
    (state): IAuthState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    }),
  ),
  on(
    registerSuccessActions,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    }),
  ),
  on(
    registerFailureActions,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }),
  ),

  //login
  on(
    loginActions,
    (state): IAuthState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    }),
  ),
  on(
    loginSuccessActions,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    }),
  ),
  on(
    loginFailureActions,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }),
  ),

  //user
  on(
    getCurrentUserAction,
    (state): IAuthState => ({
      ...state,
      isLoading: true,
    }),
  ),

  on(
    getCurrentUserSuccess,
    (state, action): IAuthState => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    }),
  ),
  on(
    getCurrentUserFailureAction,
    (state): IAuthState => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    }),
  ),
  on(
    updateCurrentUserSuccessActions,
    (state, action): IAuthState => ({
      ...state,
      currentUser: action.currentUser,
    }),
  ),
  on(logoutAction, () => ({
    ...initialState,
    isLoggedIn: false,
  })),
);

export function reducers(state: IAuthState, action: Action): IAuthState {
  return authReducer(state, action);
}
