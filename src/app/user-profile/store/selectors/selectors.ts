import { IAppState } from '@shared/types/appState.interface';
import { createSelector } from '@ngrx/store';
import { IUserProfileState } from '@app/user-profile/types/user-profile-state.interface';

export const userProfileFeatureSelector = (
  state: IAppState,
): IUserProfileState => state.userProfile;

export const isLoadingSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: IUserProfileState) => userProfileState.isLoading,
);

export const userProfileSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: IUserProfileState) => userProfileState.data,
);

export const errorSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: IUserProfileState) => userProfileState.error,
);
