import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@auth/store/actionTypes';
import { ICurrentUser } from '@shared/types/currentUser.interface';

export const getCurrentUserAction = createAction(ActionTypes.GET_CURRENT_USER);

export const getCurrentUserSuccess = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ currentUser: ICurrentUser }>(),
);

export const getCurrentUserFailureAction = createAction(
  ActionTypes.GET_CURRENT_USER_FAILURE,
);
