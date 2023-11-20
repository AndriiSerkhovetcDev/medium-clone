import { Action, createReducer, on } from '@ngrx/store';
import { IPopularTagsState } from '@shared/modules/popular-tags/types/popular-tags-state.interface';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from '@shared/modules/popular-tags/store/actions/get-popular-tags.action';

const initialState: IPopularTagsState = {
  isLoading: false,
  error: null,
  tags: null,
};

const tagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state): IPopularTagsState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getPopularTagsSuccessAction,
    (state, action): IPopularTagsState => ({
      ...state,
      isLoading: false,
      tags: action.tags,
    }),
  ),
  on(
    getPopularTagsFailureAction,
    (state): IPopularTagsState => ({
      ...state,
      isLoading: false,
    }),
  ),
);

export function reducers(state: IPopularTagsState, action: Action) {
  return tagsReducer(state, action);
}
