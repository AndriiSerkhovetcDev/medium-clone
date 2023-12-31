import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RegisterComponent } from './components/register/register.component';

import { AuthService } from './services/auth/auth.service';
import { RegisterEffect } from './store/effects/register.effect';
import { BackendErrorMessagesModule } from '@shared/modules/backend-error-messages/backendErrorMessages.module';
import { PersistenceService } from '@app/shared/services/persistence/persistence.service';
import { LoginComponent } from './components/login/login.component';
import { LoginEffect } from '@auth/store/effects/login.effect';
import { UserEffects } from '@auth/store/effects/user.effects';
import { reducers } from '@auth/store/reducers/reducers';

import { UpdateCurrentUserEffect } from '@auth/store/effects/update-current-user.effect';
import { LogoutEffect } from '@auth/store/effects/logout.effect';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      UserEffects,
      UpdateCurrentUserEffect,
      LogoutEffect,
    ]),
    BackendErrorMessagesModule,
  ],
  providers: [AuthService, PersistenceService],
})
export class AuthModule {}
