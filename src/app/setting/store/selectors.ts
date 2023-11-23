import { IAppState } from '@shared/types/appState.interface';
import { createSelector } from '@ngrx/store';
import { ISettingsState } from '@app/setting/types/update-current-user-state.interface';

export const updateCurrentUserFeatureSelector = (
  state: IAppState,
): ISettingsState => state.settings;
export const isSubmittingSelector = createSelector(
  updateCurrentUserFeatureSelector,
  (updateCurrentUserState: ISettingsState) =>
    updateCurrentUserState.isSubmitting,
);

export const validationErrorsSelector = createSelector(
  updateCurrentUserFeatureSelector,
  (updateCurrentUserState: ISettingsState) =>
    updateCurrentUserState.validationErrors,
);
