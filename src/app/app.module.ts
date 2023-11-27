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
import { PersistenceService } from '@app/shared/services/persistence/persistence.service';
import { AuthInterceptor } from '@shared/interceptors/auth/auth.interceptor';
import { GlobalFeedModule } from './global-feed/global-feed.module';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { YourFeedModule } from '@app/your-feed/your-feed.module';
import { TagFeedModule } from '@app/tag-feed/tag-feed.module';
import { ArticleModule } from '@app/article/article.module';
import { CreateArticleModule } from '@app/create-article/create-article.module';
import { UpdateArticleModule } from '@app/update-article/update-article.module';
import { SettingsModule } from '@app/setting/settings.module';
import { UserProfileModule } from '@app/user-profile/user-profile.module';

const rootModules = [BrowserModule, AppRoutingModule, HttpClientModule];

const storeModules = [
  StoreModule.forRoot({ router: routerReducer }, {}),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  StoreRouterConnectingModule.forRoot(),
];

const sharedModules = [TopBarModule];
const customModules = [
  AuthModule,
  GlobalFeedModule,
  YourFeedModule,
  TagFeedModule,
  CreateArticleModule,
  UpdateArticleModule,
  ArticleModule,
  SettingsModule,
  UserProfileModule,
];
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
