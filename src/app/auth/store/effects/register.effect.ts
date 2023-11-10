import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';
import {
  registerActions,
  registerFailureActions,
  registerSuccessActions,
} from '../actions/register.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { ICurrentUser } from '../../../shared/types/currentUser.interface';

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
            return registerSuccessActions({ currentUser });
          }),
          catchError(() => {
            return of(registerFailureActions());
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
