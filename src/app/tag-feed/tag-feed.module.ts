import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagFeedComponent } from './components/tag-feed/tag-feed.component';
import { BannerModule } from '@shared/modules/banner/banner.module';
import { FeedModule } from '@shared/modules/feed/feed.module';
import { FeedToggleModule } from '@shared/modules/feed-toggler/feed-toggle.module';
import { PopularTagsModule } from '@shared/modules/popular-tags/popular-tags.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'tags/:slug',
    component: TagFeedComponent,
  },
];
@NgModule({
  declarations: [TagFeedComponent],
  imports: [
    CommonModule,
    BannerModule,
    FeedModule,
    FeedToggleModule,
    PopularTagsModule,
    RouterModule.forChild(routes),
  ],
})
export class TagFeedModule {}
