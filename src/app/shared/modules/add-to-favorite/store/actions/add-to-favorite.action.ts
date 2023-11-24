import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@shared/modules/add-to-favorite/store/actionTypes';
import { IArticle } from '@shared/types/article.interface';

export const addToFavoriteAction = createAction(
  ActionTypes.ADD_TO_FAVORITE,
  props<{ isFavorited: boolean; slug: string }>(),
);

export const addToFavoriteSuccessAction = createAction(
  ActionTypes.ADD_TO_FAVORITE_SUCCESS,
  props<{ article: IArticle }>(),
);

export const addToFavoriteFailureAction = createAction(
  ActionTypes.ADD_TO_FAVORITE_FAILURE,
);
