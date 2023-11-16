import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap } from 'rxjs';
import { PersistenceService } from '@app/shared/services/persistence/persistence.service';
import { Injectable } from '@angular/core';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from '../actions/get-feed.action';
import { FeedService } from '../../services/feed.service';
import { IGetFeedResponse } from '../../types/get-feed-response.interface';

@Injectable({
  providedIn: 'root',
})
export class GetFeedEffects {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: IGetFeedResponse) => {
            return getFeedSuccessAction({ feed });
          }),
          catchError(() => {
            return of(getFeedFailureAction());
          }),
        );
      }),
    ),
  );
  constructor(
    private actions$: Actions,
    private feedService: FeedService,
  ) {}
}
