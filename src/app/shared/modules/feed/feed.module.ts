import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { EffectsModule } from '@ngrx/effects';
import { GetFeedEffects } from './store/effects/get-feed.effect';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { LoadingModule } from '../loading/loading.module';
import { PaginationModule } from '../pagination/pagination.module';
import { TagListModule } from '@shared/modules/tag-list/tag-list.module';
import { reducers } from '@shared/modules/feed/store/reducers/reducers';
import { AddToFavoriteModule } from '@shared/modules/add-to-favorite/add-to-favorite.module';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetFeedEffects]),
    StoreModule.forFeature('feed', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    PaginationModule,
    TagListModule,
    AddToFavoriteModule,
  ],
  exports: [FeedComponent],
})
export class FeedModule {}
