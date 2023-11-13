import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

const rootModules = [BrowserModule, AppRoutingModule, HttpClientModule];

const storeModules = [
  StoreModule.forRoot({}, {}),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
];

const customModules = [AuthModule];
@NgModule({
  declarations: [AppComponent],
  imports: [...rootModules, ...storeModules, ...customModules],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
