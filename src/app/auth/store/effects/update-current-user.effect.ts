import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@auth/services/auth/auth.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ICurrentUser } from '@shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';
import {
  updateCurrentUserActions,
  updateCurrentUserFailureActions,
  updateCurrentUserSuccessActions,
} from '@auth/store/actions/update-current-user.action';

@Injectable({
  providedIn: 'root',
})
export class UpdateCurrentUserEffect {
  updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCurrentUserActions),
      switchMap(({ currentUserInput }) => {
        return this.authService.updateCurrentUser(currentUserInput).pipe(
          map((currentUser: ICurrentUser) => {
            return updateCurrentUserSuccessActions({ currentUser });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              updateCurrentUserFailureActions({ errors: error.error.errors }),
            );
          }),
        );
      }),
    ),
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}
}
