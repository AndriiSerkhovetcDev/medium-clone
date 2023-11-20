import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GetPopularTagsEffect } from '@shared/modules/popular-tags/store/effects/get-popular-tags.effect';
import { reducers } from '@shared/modules/popular-tags/store/reducers/reducers';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { RouterModule } from '@angular/router';
import { ErrorMessageModule } from '@shared/modules/error-message/error-message.module';

@NgModule({
  declarations: [PopularTagsComponent],
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([GetPopularTagsEffect]),
    StoreModule.forFeature('tags', reducers),
    LoadingModule,
    ErrorMessageModule,
  ],
  exports: [PopularTagsComponent],
})
export class PopularTagsModule {}
