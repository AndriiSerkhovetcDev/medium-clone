import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YourFeedComponent } from './components/your-feed/your-feed.component';
import { RouterModule } from '@angular/router';
import { BannerModule } from '@shared/modules/banner/banner.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { FeedModule } from '@shared/modules/feed/feed.module';
import { FeedToggleModule } from '@shared/modules/feed-toggler/feed-toggle.module';
import { PopularTagsModule } from '@shared/modules/popular-tags/popular-tags.module';

const routes = [
  {
    path: 'feed',
    component: YourFeedComponent,
  },
];

@NgModule({
  declarations: [YourFeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BannerModule,
    LoadingModule,
    FeedModule,
    FeedToggleModule,
    PopularTagsModule,
  ],
})
export class YourFeedModule {}
