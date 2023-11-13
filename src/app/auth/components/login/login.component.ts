import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IBackendErrors } from '@auth/types/backendErrors.interface';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@shared/types/appState.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '@auth/store/selectors/selectors';
import { loginActions } from '@auth/store/actions/login.action';
import { ILoginRequest } from '@auth/types/loginRequest.interface';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<IBackendErrors | null>;
  constructor(
    private store: Store<IAppState>,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.initializeValues();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  public onSubmit(): void {
    const request: ILoginRequest = {
      user: this.loginForm.value,
    };
    this.store.dispatch(loginActions({ request }));
  }
}
