import { ActionTypes } from '@app/create-article/store/actionTypes';
import { createAction, props } from '@ngrx/store';
import { IArticleInput } from '@shared/types/article-input.interface';
import { IBackendErrors } from '@auth/types/backendErrors.interface';
import { IArticle } from '@shared/types/article.interface';

export const createArticleAction = createAction(
  ActionTypes.CREATE_ARTICLE,
  props<{ articleInput: IArticleInput }>(),
);

export const createArticleSuccessAction = createAction(
  ActionTypes.CREATE_ARTICLE_SUCCESS,
  props<{ article: IArticle }>(),
);

export const createArticleFailureAction = createAction(
  ActionTypes.CREATE_ARTICLE_FAILURE,
  props<{ errors: IBackendErrors }>(),
);
