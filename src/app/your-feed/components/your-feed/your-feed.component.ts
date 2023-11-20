import { Component } from '@angular/core';

@Component({
  selector: 'mc-your-feed',
  templateUrl: './your-feed.component.html',
  styleUrls: ['./your-feed.component.scss'],
})
export class YourFeedComponent {
  public apiArticlesUrl = '/articles/feed';
}
