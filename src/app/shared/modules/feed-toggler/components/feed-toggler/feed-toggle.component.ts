import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@shared/types/appState.interface';
import { Observable } from 'rxjs';
import { isLoggedInSelector } from '@auth/store/selectors/selectors';

@Component({
  selector: 'mc-feed-toggle',
  templateUrl: './feed-toggle.component.html',
  styleUrls: ['./feed-toggle.component.scss'],
})
export class FeedToggleComponent implements OnInit {
  @Input('tagName') tagNameProps: string | null;

  public isLoggedIn$: Observable<boolean>;
  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.initializeValues();
  }

  private initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }
}
