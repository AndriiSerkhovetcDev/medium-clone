import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';
import {
  registerActions,
  registerFailureActions,
  registerSuccessActions,
} from '../actions/register.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ICurrentUser } from '@shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistenceService } from '@app/shared/services/persistence/persistence.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerActions),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: ICurrentUser) => {
            this.presistenceService.set('accessToken', currentUser.token);

            return registerSuccessActions({ currentUser });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(registerFailureActions({ errors: error.error.errors }));
          }),
        );
      }),
    ),
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessActions),
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
