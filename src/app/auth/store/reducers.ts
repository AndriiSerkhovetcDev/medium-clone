import { Action, createReducer, on } from '@ngrx/store';

import { IAuthState } from '../types/authState.interface';
import { registerActions } from './actions/register.action';

const initialState: IAuthState = {
  isSubmitting: false,
};

const authReducer = createReducer(
  initialState,
  on(registerActions, (state): IAuthState => {
    return {
      ...state,
      isSubmitting: true,
    };
  }),
);

export function reducers(state: IAuthState, action: Action): IAuthState {
  return authReducer(state, action);
}
