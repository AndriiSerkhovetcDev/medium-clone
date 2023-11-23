import { IAppState } from '@shared/types/appState.interface';
import { createSelector } from '@ngrx/store';
import { ICreateArticleState } from '@app/create-article/types/create-article-state.interface';

export const createArticleFeatureSelector = (
  state: IAppState,
): ICreateArticleState => state.createArticle;
export const isSubmittingSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: ICreateArticleState) => createArticleState.isSubmitting,
);

export const validationErrorsSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: ICreateArticleState) =>
    createArticleState.validationErrors,
);
