import { IAppState } from '@app/shared/types/appState.interface';
import { IFeedState } from '../../types/feed-state.interface';
import { createSelector } from '@ngrx/store';

export const feedFeatureSelector = (state: IAppState): IFeedState => state.feed;

export const isLoadingSelector = createSelector(
  feedFeatureSelector,
  (feedState: IFeedState) => feedState.isLoading,
);

export const feedSelector = createSelector(
  feedFeatureSelector,
  (feedState: IFeedState) => feedState.data,
);

export const errorSelector = createSelector(
  feedFeatureSelector,
  (feedState: IFeedState) => feedState.error,
);
