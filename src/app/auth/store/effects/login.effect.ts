import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@auth/services/auth/auth.service';
import { PersistenceService } from '@app/shared/services/persistence/persistence.service';
import { Router } from '@angular/router';
import {
  loginActions,
  loginFailureActions,
  loginSuccessActions,
} from '@auth/store/actions/login.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ICurrentUser } from '@shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: ICurrentUser) => {
            this.presistenceService.set('accessToken', currentUser.token);

            return loginSuccessActions({ currentUser });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(loginFailureActions({ errors: error.error.errors }));
          }),
        );
      }),
    ),
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessActions),
        tap(() => this.router.navigate(['/'])),
      ),
    { dispatch: false },
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private presistenceService: PersistenceService,
    private router: Router,
  ) {}
}
