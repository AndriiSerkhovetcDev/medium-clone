import { Component, OnInit } from '@angular/core';
import { IAppState } from '@shared/types/appState.interface';
import { select, Store } from '@ngrx/store';
import { getUserProfileAction } from '@app/user-profile/store/actions/get-user-proflle.action';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatestWith, filter, map, Observable } from 'rxjs';
import { IUserProfile } from '@shared/types/profile.interface';
import {
  errorSelector,
  isLoadingSelector,
  userProfileSelector,
} from '@app/user-profile/store/selectors/selectors';
import { currentUserSelector } from '@auth/store/selectors/selectors';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  private slug: string;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string>;
  public apiUrl: string;
  public userProfile$: Observable<IUserProfile>;
  public isAuthor$: Observable<boolean>;
  public slugTest: string;

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((res) => {
      this.slug = res['slug'];
      this.initializeValues();
      this.fetchData();
    });
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.userProfile$ = this.store.pipe(select(userProfileSelector));
    this.isAuthor$ = this.isAuthor();
    this.apiUrl = this.getApiUrl();
  }

  private isAuthor(): Observable<boolean> {
    return this.userProfile$.pipe(
      filter(Boolean),
      combineLatestWith(this.store.pipe(select(currentUserSelector))),
      filter(Boolean),
      map(
        ([userProfile, currentUser]) =>
          userProfile?.username === currentUser?.username,
      ),
    );
  }

  private fetchData(): void {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }));
  }

  public getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    const favoritesFeedUrl = `/articles?favorited=${this.slug}`;
    const profileFeedUrl = `/articles?author=${this.slug}`;

    return isFavorites ? favoritesFeedUrl : profileFeedUrl;
  }
}
