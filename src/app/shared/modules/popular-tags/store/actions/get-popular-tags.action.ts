import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@shared/modules/popular-tags/store/actionTypes';
import { PopularTagType } from '@shared/types/popularTag.type';

export const getPopularTagsAction = createAction(
  ActionTypes.GET_TAGS,
  props<{ url: string }>(),
);

export const getPopularTagsSuccessAction = createAction(
  ActionTypes.GET_TAGS_SUCCESS,
  props<{ tags: PopularTagType[] }>(),
);

export const getPopularTagsFailureAction = createAction(
  ActionTypes.GET_TAGS_FAILURE,
);
