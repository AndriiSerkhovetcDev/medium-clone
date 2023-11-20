import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedToggleComponent } from './components/feed-toggler/feed-toggle.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FeedToggleComponent],
  imports: [CommonModule, RouterModule],
  exports: [FeedToggleComponent],
})
export class FeedToggleModule {}
