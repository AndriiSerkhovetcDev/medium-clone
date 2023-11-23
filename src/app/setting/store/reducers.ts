import { ISettingsState } from '@app/setting/types/update-current-user-state.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  updateCurrentUserActions,
  updateCurrentUserFailureActions,
  updateCurrentUserSuccessActions,
} from '@auth/store/actions/update-current-user.action';

const initialState: ISettingsState = {
  isSubmitting: false,
  validationErrors: null,
};

const settingsReducer = createReducer(
  initialState,
  on(
    updateCurrentUserActions,
    (state): ISettingsState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    }),
  ),
  on(
    updateCurrentUserSuccessActions,
    (state): ISettingsState => ({
      ...state,
      isSubmitting: false,
    }),
  ),
  on(
    updateCurrentUserFailureActions,
    (state, action): ISettingsState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }),
  ),
);

export function reducers(state: ISettingsState, action: Action) {
  return settingsReducer(state, action);
}
