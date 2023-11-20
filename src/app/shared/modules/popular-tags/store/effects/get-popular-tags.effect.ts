import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { PopularTagsService } from '@shared/modules/popular-tags/services/popular-tags.service';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from '@shared/modules/popular-tags/store/actions/get-popular-tags.action';
import { IGetPopularTagsResponse } from '@shared/modules/popular-tags/types/get-popular-tags-response.interface';

@Injectable({
  providedIn: 'root',
})
export class GetPopularTagsEffect {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.tagService.getPopularTags().pipe(
          map((tags: IGetPopularTagsResponse) => {
            return getPopularTagsSuccessAction(tags);
          }),
          catchError(() => {
            return of(getPopularTagsFailureAction());
          }),
        );
      }),
    ),
  );
  constructor(
    private actions$: Actions,
    private tagService: PopularTagsService,
  ) {}
}
