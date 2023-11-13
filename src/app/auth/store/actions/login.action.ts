import { ActionTypes } from '@auth/store/actionTypes';
import { createAction, props } from '@ngrx/store';
import { ILoginRequest } from '@auth/types/loginRequest.interface';
import { ICurrentUser } from '@shared/types/currentUser.interface';
import { IBackendErrors } from '@auth/types/backendErrors.interface';

export const loginActions = createAction(
  ActionTypes.LOGIN,
  props<{ request: ILoginRequest }>(),
);

export const loginSuccessActions = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ currentUser: ICurrentUser }>(),
);

export const loginFailureActions = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ errors: IBackendErrors }>(),
);
