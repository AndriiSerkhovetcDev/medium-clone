import { IUserProfileState } from '@app/user-profile/types/user-profile-state.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction,
} from '@app/user-profile/store/actions/get-user-proflle.action';
import { routerNavigationAction } from '@ngrx/router-store';
import { IArticleState } from '@app/article/types/article-state.interface';

const initialState: IUserProfileState = {
  isLoading: false,
  error: null,
  data: null,
};

const userProfileReducer = createReducer(
  initialState,
  on(
    getUserProfileAction,
    (state): IUserProfileState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getUserProfileSuccessAction,
    (state, action): IUserProfileState => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    }),
  ),
  on(
    getUserProfileFailureAction,
    (state): IUserProfileState => ({
      ...state,
      isLoading: false,
    }),
  ),
  on(routerNavigationAction, (): IUserProfileState => initialState),
);

export function reducers(state: IUserProfileState, action: Action) {
  return userProfileReducer(state, action);
}
