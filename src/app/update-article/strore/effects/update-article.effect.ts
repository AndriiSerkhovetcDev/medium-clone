import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IArticle } from '@shared/types/article.interface';
import { UpdateArticleService } from '@app/update-article/services/update-article/update-article.service';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from '@app/update-article/strore/actions/update-article.action';

@Injectable({
  providedIn: 'root',
})
export class UpdateArticleEffect {
  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({ articleInput, slug }) => {
        return this.updateArticleService.updateArticle(articleInput, slug).pipe(
          map((article: IArticle) => {
            return updateArticleSuccessAction({ article });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              updateArticleFailureAction({ errors: error.error.errors }),
            );
          }),
        );
      }),
    ),
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({ article }) => this.router.navigate(['/articles', article.slug])),
      ),
    { dispatch: false },
  );
  constructor(
    private actions$: Actions,
    private updateArticleService: UpdateArticleService,
    private router: Router,
  ) {}
}
