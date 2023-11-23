import { ActionTypes } from '@auth/store/actionTypes';
import { createAction, props } from '@ngrx/store';
import { ICurrentUser } from '@shared/types/currentUser.interface';
import { IBackendErrors } from '@auth/types/backendErrors.interface';
import { ICurrentUserInput } from '@shared/types/current-user-input.interface';

export const updateCurrentUserActions = createAction(
  ActionTypes.UPDATE_CURRENT_USER,
  props<{ currentUserInput: ICurrentUserInput }>(),
);

export const updateCurrentUserSuccessActions = createAction(
  ActionTypes.UPDATE_CURRENT_USER_SUCCESS,
  props<{ currentUser: ICurrentUser }>(),
);

export const updateCurrentUserFailureActions = createAction(
  ActionTypes.UPDATE_CURRENT_USER_FAILURE,
  props<{ errors: IBackendErrors }>(),
);
