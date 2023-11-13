import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerActions } from '../../store/actions/register.action';
import { IAppState } from '@shared/types/appState.interface';
import { Observable } from 'rxjs';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors/selectors';
import { IRegisterRequest } from '../../types/registerRequest.interface';
import { IBackendErrors } from '@auth/types/backendErrors.interface';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<IBackendErrors | null>;
  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  public OnSubmit(): void {
    const request: IRegisterRequest = {
      user: this.registerForm.value,
    };
    this.store.dispatch(registerActions({ request }));
  }
}
