import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrentUser } from '@shared/types/currentUser.interface';
import { IAppState } from '@shared/types/appState.interface';
import { select, Store } from '@ngrx/store';
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector,
} from '@auth/store/selectors/selectors';

@Component({
  selector: 'mc-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;
  public isAnonymous$: Observable<boolean>;
  public currentUser$: Observable<ICurrentUser | null>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }
}
