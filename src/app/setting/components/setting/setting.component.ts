import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAppState } from '@shared/types/appState.interface';
import { select, Store } from '@ngrx/store';
import { DestroyObsService } from '@shared/services/destroy-obs/destroy-obs.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICurrentUser } from '@shared/types/currentUser.interface';
import { filter, Observable, takeUntil } from 'rxjs';
import { IBackendErrors } from '@auth/types/backendErrors.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '@app/setting/store/selectors';
import { currentUserSelector } from '@auth/store/selectors/selectors';
import { ICurrentUserInput } from '@shared/types/current-user-input.interface';
import { updateCurrentUserActions } from '@auth/store/actions/update-current-user.action';
import { logoutAction } from '@auth/store/actions/sync.action';

@Component({
  selector: 'mc-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public currentUser: ICurrentUser;
  public isSubmitting$: Observable<boolean>;
  public validationErrors$: Observable<IBackendErrors | null>;

  constructor(
    private store: Store<IAppState>,
    private destroy$: DestroyObsService,
    private fb: FormBuilder,
  ) {}
  ngOnInit() {
    this.initializeListeners();
    this.initializeValues();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.validationErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  private initializeListeners(): void {
    this.store
      .pipe(
        select(currentUserSelector),
        filter(Boolean),
        takeUntil(this.destroy$),
      )
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  public onSubmit(): void {
    const currentUserInput: ICurrentUserInput = {
      ...this.currentUser,
      ...this.form.value,
    };

    this.store.dispatch(updateCurrentUserActions({ currentUserInput }));
  }

  public logout(): void {
    this.store.dispatch(logoutAction());
  }
}
