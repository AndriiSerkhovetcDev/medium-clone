import { IAppState } from '@app/shared/types/appState.interface';
import { createSelector } from '@ngrx/store';
import { IArticleState } from '@app/article/types/article-state.interface';

export const articleFeatureSelector = (state: IAppState): IArticleState =>
  state.article;

export const isLoadingSelector = createSelector(
  articleFeatureSelector,
  (feedState: IArticleState) => feedState.isLoading,
);

export const articleSelector = createSelector(
  articleFeatureSelector,
  (feedState: IArticleState) => feedState.data,
);

export const errorSelector = createSelector(
  articleFeatureSelector,
  (feedState: IArticleState) => feedState.error,
);
