import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { EffectsModule } from '@ngrx/effects';
import { GetFeedEffects } from './store/effects/get-feed.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/reducers';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetFeedEffects]),
    StoreModule.forFeature('feed', reducers),
  ],
  exports: [FeedComponent],
})
export class FeedModule {}
