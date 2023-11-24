import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IAppState } from '@app/shared/types/appState.interface';
import { Store, select } from '@ngrx/store';
import { getFeedAction } from '../../store/actions/get-feed.action';
import { IGetFeedResponse } from '../../types/get-feed-response.interface';
import { Observable, takeUntil } from 'rxjs';
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from '../../store/selectors/selectors';
import { environment } from '@environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DestroyObsService } from '@app/shared/services/destroy-obs/destroy-obs.service';
import { parseUrl, stringify } from 'query-string';
import { IArticle } from '@shared/types/article.interface';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit, OnChanges {
  @Input('apiUrl') apiUrlProps: string;

  public feed$: Observable<IGetFeedResponse | null>;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string | null>;
  public limit = environment.limit;
  public baseUrl: string;
  public currentPage: number;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private route: ActivatedRoute,
    private destroy$: DestroyObsService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const isApiUrlChanged =
      !changes['apiUrlProps'].firstChange &&
      changes['apiUrlProps'].currentValue !==
        changes['apiUrlProps'].previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  private initializeValues(): void {
    this.feed$ = this.store.pipe(select(feedSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  private fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = parseUrl(this.apiUrlProps);
    const stringifierParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiWithParams = `${parsedUrl.url}?${stringifierParams}`;

    this.store.dispatch(getFeedAction({ url: apiWithParams }));
  }

  private initializeListeners(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        this.fetchFeed();
      });
  }
}
