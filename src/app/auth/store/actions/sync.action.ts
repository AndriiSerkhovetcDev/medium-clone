import { createAction } from '@ngrx/store';
import { ActionTypes } from '@auth/store/actionTypes';

export const logoutAction = createAction(ActionTypes.LOGOUT);
