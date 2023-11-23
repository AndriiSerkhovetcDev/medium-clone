import { IAppState } from '@shared/types/appState.interface';
import { createSelector } from '@ngrx/store';
import { IUpdateArticleState } from '@app/update-article/types/update-article-state';

export const updateArticleFeatureSelector = (
  state: IAppState,
): IUpdateArticleState => state.updateArticle;
export const isSubmittingSelector = createSelector(
  updateArticleFeatureSelector,
  (updateArticleState: IUpdateArticleState) => updateArticleState.isSubmitting,
);

export const isLoadingSelector = createSelector(
  updateArticleFeatureSelector,
  (updateArticleState: IUpdateArticleState) => updateArticleState.isLoading,
);

export const articleSelector = createSelector(
  updateArticleFeatureSelector,
  (updateArticleState: IUpdateArticleState) => updateArticleState.article,
);

export const validationErrorsSelector = createSelector(
  updateArticleFeatureSelector,
  (updateArticleState: IUpdateArticleState) =>
    updateArticleState.validationErrors,
);
