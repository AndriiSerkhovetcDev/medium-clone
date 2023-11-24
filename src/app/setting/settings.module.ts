import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './components/setting/setting.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@app/setting/store/reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendErrorMessagesModule } from '@shared/modules/backend-error-messages/backendErrorMessages.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';

const routes = [
  {
    path: 'settings',
    component: SettingComponent,
  },
];

@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', reducers),
    ReactiveFormsModule,
    BackendErrorMessagesModule,
    LoadingModule,
  ],
})
export class SettingsModule {}
