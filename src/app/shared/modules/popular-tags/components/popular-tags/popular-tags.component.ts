import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PopularTagType } from '@shared/types/popularTag.type';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@shared/types/appState.interface';
import {
  errorSelector,
  isLoadingSelector,
  popularTagsSelector,
} from '@shared/modules/popular-tags/store/selectors/selectors';
import { getPopularTagsAction } from '@shared/modules/popular-tags/store/actions/get-popular-tags.action';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  @Input('apiUrl') apiUrlProps: string;
  public popularTags$: Observable<PopularTagType[]>;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string | null>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.initializeValues();
    this.fetchTags();
  }

  private initializeValues(): void {
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  private fetchTags(): void {
    this.store.dispatch(getPopularTagsAction());
  }
}
