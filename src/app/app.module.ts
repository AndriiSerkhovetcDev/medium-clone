import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TopBarModule } from '@shared/modules/top-bar/top-bar.module';
import { PersistenceService } from '@shared/services/persistence.service';
import { AuthInterceptor } from '@shared/interceptors/auth/auth.interceptor';
import { GlobalFeedModule } from './global-feed/global-feed.module';
import { FeedComponent } from './shared/modules/feed/components/feed/feed.component';

const rootModules = [BrowserModule, AppRoutingModule, HttpClientModule];

const storeModules = [
  StoreModule.forRoot({}, {}),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
];

const sharedModules = [TopBarModule];
const customModules = [AuthModule, GlobalFeedModule];
@NgModule({
  declarations: [AppComponent],
  imports: [
    ...rootModules,
    ...storeModules,
    ...customModules,
    ...sharedModules,
  ],
  providers: [
    PersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
