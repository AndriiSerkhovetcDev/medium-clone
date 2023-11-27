import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@app/user-profile/store/actionTypes';
import { IUserProfile } from '@shared/types/profile.interface';

export const getUserProfileAction = createAction(
  ActionTypes.GET_USER_PROFILE,
  props<{ slug: string }>(),
);

export const getUserProfileSuccessAction = createAction(
  ActionTypes.GET_USER_PROFILE_SUCCESS,
  props<{ userProfile: IUserProfile }>(),
);

export const getUserProfileFailureAction = createAction(
  ActionTypes.GET_USER_PROFILE_FAILURE,
);
