import { createAction, props } from '@ngrx/store';
import { IArticleInput } from '@shared/types/article-input.interface';
import { IBackendErrors } from '@auth/types/backendErrors.interface';
import { IArticle } from '@shared/types/article.interface';
import { ActionTypes } from '@app/update-article/strore/actionTypes';

export const updateArticleAction = createAction(
  ActionTypes.UPDATE_ARTICLE,
  props<{ articleInput: IArticleInput; slug: string }>(),
);

export const updateArticleSuccessAction = createAction(
  ActionTypes.UPDATE_ARTICLE_SUCCESS,
  props<{ article: IArticle }>(),
);

export const updateArticleFailureAction = createAction(
  ActionTypes.UPDATE_ARTICLE_FAILURE,
  props<{ errors: IBackendErrors }>(),
);
