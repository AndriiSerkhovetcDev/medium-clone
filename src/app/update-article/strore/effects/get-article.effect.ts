import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';

import { SharedArticleService } from '@shared/services/article/shared-article.service';
import { IArticle } from '@shared/types/article.interface';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '@app/update-article/strore/actions/get-article.action';

@Injectable({
  providedIn: 'root',
})
export class GetArticleEffect {
  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({ slug }) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: IArticle) => {
            return getArticleSuccessAction({ article });
          }),
          catchError(() => {
            return of(getArticleFailureAction());
          }),
        );
      }),
    ),
  );
  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService,
  ) {}
}
