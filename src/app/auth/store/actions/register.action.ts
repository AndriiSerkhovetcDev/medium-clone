import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '../actionTypes';
import { IRegisterRequest } from '../../types/registerRequest.interface';
import { ICurrentUser } from '@shared/types/currentUser.interface';
import { IBackendErrors } from '@auth/types/backendErrors.interface';

export const registerActions = createAction(
  ActionTypes.REGISTER,
  props<{ request: IRegisterRequest }>(),
);

export const registerSuccessActions = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ currentUser: ICurrentUser }>(),
);

export const registerFailureActions = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ errors: IBackendErrors }>(),
);
