import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@app/user-profile/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { GetUserProfileEffect } from '@app/user-profile/store/effects/get-user-profile.effect';
import { FeedModule } from '@shared/modules/feed/feed.module';
import { ErrorMessageModule } from '@shared/modules/error-message/error-message.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';

const routes = [
  {
    path: 'profiles/:slug',
    component: UserProfileComponent,
  },
  {
    path: 'profiles/:slug/favorites',
    component: UserProfileComponent,
  },
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('userProfile', reducers),
    EffectsModule.forFeature([GetUserProfileEffect]),
    FeedModule,
    ErrorMessageModule,
    LoadingModule,
  ],
})
export class UserProfileModule {}
