import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { logoutAction } from '@auth/store/actions/sync.action';
import { tap } from 'rxjs';
import { PersistenceService } from '@shared/services/persistence/persistence.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogoutEffect {
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.presistanceService.set('accessToken', '');
          this.router.navigate(['/']);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private presistanceService: PersistenceService,
    private router: Router,
  ) {}
}
