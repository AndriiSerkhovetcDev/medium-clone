import { IAppState } from '@shared/types/appState.interface';
import { createSelector } from '@ngrx/store';
import { IPopularTagsState } from '@shared/modules/popular-tags/types/popular-tags-state.interface';

export const popularTagsFeatureSelector = (
  state: IAppState,
): IPopularTagsState => state.tags;

export const isLoadingSelector = createSelector(
  popularTagsFeatureSelector,
  (tagState: IPopularTagsState) => tagState.isLoading,
);

export const popularTagsSelector = createSelector(
  popularTagsFeatureSelector,
  (tagState: IPopularTagsState) => tagState.tags,
);

export const errorSelector = createSelector(
  popularTagsFeatureSelector,
  (tagState: IPopularTagsState) => tagState.error,
);
