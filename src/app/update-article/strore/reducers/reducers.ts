import { Action, createReducer, on } from '@ngrx/store';
import { IUpdateArticleState } from '@app/update-article/types/update-article-state';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from '@app/update-article/strore/actions/update-article.action';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '@app/update-article/strore/actions/get-article.action';

const initialState: IUpdateArticleState = {
  isLoading: false,
  article: null,
  isSubmitting: false,
  validationErrors: null,
};

const updateArticleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): IUpdateArticleState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getArticleSuccessAction,
    (state, action): IUpdateArticleState => ({
      ...state,
      isLoading: false,
      article: action.article,
    }),
  ),
  on(
    getArticleFailureAction,
    (state): IUpdateArticleState => ({
      ...state,
      isLoading: false,
    }),
  ),
  on(
    updateArticleAction,
    (state): IUpdateArticleState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    }),
  ),
  on(
    updateArticleSuccessAction,
    (state, action): IUpdateArticleState => ({
      ...state,
      isSubmitting: false,
      article: action.article,
    }),
  ),
  on(
    updateArticleFailureAction,
    (state, action): IUpdateArticleState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }),
  ),
);

export function reducers(state: IUpdateArticleState, action: Action) {
  return updateArticleReducer(state, action);
}
