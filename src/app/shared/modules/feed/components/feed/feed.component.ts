import { Component, Input, OnInit } from '@angular/core';
import { IAppState } from '@app/shared/types/appState.interface';
import { Store, select } from '@ngrx/store';
import { getFeedAction } from '../../store/actions/get-feed.action';
import { IGetFeedResponse } from '../../types/get-feed-response.interface';
import { Observable } from 'rxjs';
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from '../../store/selectors/selectors';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input('apiUrl') apiUrlProps: string;
  public feed$: Observable<IGetFeedResponse | null>;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string | null>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.fetchData();
    this.initializeValues();
  }

  private initializeValues(): void {
    this.feed$ = this.store.pipe(select(feedSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  private fetchData(): void {
    this.store.dispatch(getFeedAction({ url: this.apiUrlProps }));
  }
}
