import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFeedComponent } from './components/global-feed/global-feed.component';
import { RouterModule } from '@angular/router';
import { FeedModule } from '@app/shared/modules/feed/feed.module';
import { BannerModule } from '@app/shared/modules/banner/banner.module';

const routes = [
  {
    path: '',
    component: GlobalFeedComponent
  }
]

@NgModule({
  declarations: [GlobalFeedComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FeedModule, BannerModule],
  exports: [GlobalFeedComponent],
})
export class GlobalFeedModule {}
