import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionType';
import { IGetFeedResponse } from '../../types/get-feed-response.interface';

export const getFeedAction = createAction(
  ActionTypes.GET_FEED,
  props<{ url: string }>(),
);

export const getFeedSuccessAction = createAction(
  ActionTypes.GET_FEED_SUCCESS,
  props<{ feed: IGetFeedResponse }>(),
);

export const getFeedFailureAction = createAction(ActionTypes.GET_FEED_FAILURE);
