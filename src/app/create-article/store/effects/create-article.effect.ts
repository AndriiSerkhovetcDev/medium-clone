import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateArticleService } from '@app/create-article/services/create-article/create-article.service';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from '@app/create-article/store/actions/create-article.action';
import { IArticle } from '@shared/types/article.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateArticleEffect {
  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({ articleInput }) => {
        return this.createArticleService.createArticle(articleInput).pipe(
          map((article: IArticle) => {
            return createArticleSuccessAction({ article });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              createArticleFailureAction({ errors: error.error.errors }),
            );
          }),
        );
      }),
    ),
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({ article }) => this.router.navigate(['/articles', article.slug])),
      ),
    { dispatch: false },
  );
  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router,
  ) {}
}
