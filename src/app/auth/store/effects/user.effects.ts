import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ICurrentUser } from '@shared/types/currentUser.interface';
import { AuthService } from '@auth/services/auth/auth.service';
import { PersistenceService } from '@app/shared/services/persistence/persistence.service';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccess,
} from '@auth/store/actions/user.action';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.presistenceService.get('accessToken');
        if (!token) {
          return of(getCurrentUserFailureAction());
        }

        return this.authService.getCurrentUser().pipe(
          map((currentUser: ICurrentUser) => {
            return getCurrentUserSuccess({ currentUser });
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction());
          }),
        );
      }),
    ),
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private presistenceService: PersistenceService,
  ) {}
}
