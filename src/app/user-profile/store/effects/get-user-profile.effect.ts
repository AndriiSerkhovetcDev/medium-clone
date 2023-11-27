import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserProfileService } from '@app/user-profile/services/user-profile/user-profile.service';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction,
} from '@app/user-profile/store/actions/get-user-proflle.action';
import { IUserProfile } from '@shared/types/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class GetUserProfileEffect {
  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserProfileAction),
      switchMap(({ slug }) => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map((userProfile: IUserProfile) => {
            return getUserProfileSuccessAction({ userProfile });
          }),
          catchError(() => {
            return of(getUserProfileFailureAction());
          }),
        );
      }),
    ),
  );
  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService,
  ) {}
}
