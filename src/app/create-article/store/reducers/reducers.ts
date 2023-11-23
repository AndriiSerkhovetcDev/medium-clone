import { ICreateArticleState } from '@app/create-article/types/create-article-state.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from '@app/create-article/store/actions/create-article.action';

const initialState: ICreateArticleState = {
  isSubmitting: false,
  validationErrors: null,
};

const createArticleReducer = createReducer(
  initialState,
  on(
    createArticleAction,
    (state): ICreateArticleState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    }),
  ),
  on(
    createArticleSuccessAction,
    (state): ICreateArticleState => ({
      ...state,
      isSubmitting: false,
    }),
  ),
  on(
    createArticleFailureAction,
    (state, action): ICreateArticleState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }),
  ),
);

export function reducers(state: ICreateArticleState, action: Action) {
  return createArticleReducer(state, action);
}
