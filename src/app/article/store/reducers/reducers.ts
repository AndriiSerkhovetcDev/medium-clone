import { Action, createReducer, on } from '@ngrx/store';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '../actions/get-article.action';
import { IArticleState } from '@app/article/types/article-state.interface';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: IArticleState = {
  isLoading: false,
  error: null,
  data: null,
};

const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): IArticleState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getArticleSuccessAction,
    (state, action): IArticleState => ({
      ...state,
      isLoading: false,
      data: action.article,
    }),
  ),
  on(
    getArticleFailureAction,
    (state): IArticleState => ({
      ...state,
      isLoading: false,
    }),
  ),
  on(routerNavigationAction, (): IArticleState => initialState),
);

export function reducers(state: IArticleState, action: Action) {
  return articleReducer(state, action);
}
