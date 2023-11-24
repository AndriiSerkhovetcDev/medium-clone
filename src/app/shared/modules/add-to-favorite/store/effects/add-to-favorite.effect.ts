import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  addToFavoriteAction,
  addToFavoriteFailureAction,
  addToFavoriteSuccessAction,
} from '@shared/modules/add-to-favorite/store/actions/add-to-favorite.action';
import { FavoriteService } from '@shared/modules/add-to-favorite/services/favorite.service';
import { IArticle } from '@shared/types/article.interface';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoriteEffect {
  addToFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoriteAction),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? this.favoriteService.removeFromFavorite(slug)
          : this.favoriteService.addToFavorite(slug);

        return article$.pipe(
          map((article: IArticle) => {
            return addToFavoriteSuccessAction({ article });
          }),
          catchError(() => {
            return of(addToFavoriteFailureAction());
          }),
        );
      }),
    ),
  );
  constructor(
    private actions$: Actions,
    private favoriteService: FavoriteService,
  ) {}
}
