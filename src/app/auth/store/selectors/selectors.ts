import { IAppState } from '@shared/types/appState.interface';
import { IAuthState } from '../../types/authState.interface';
import { createSelector } from '@ngrx/store';

export const authFeatureSelector = (state: IAppState): IAuthState => state.auth;
export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isSubmitting,
);

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.validationErrors,
);

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isLoggedIn,
);
export const isAnonymousSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isLoggedIn === false,
);

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.currentUser,
);
