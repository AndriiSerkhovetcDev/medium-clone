import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@shared/types/appState.interface';
import { filter, takeUntil } from 'rxjs';
import { isLoggedInSelector } from '@auth/store/selectors/selectors';
import { DestroyObsService } from '@shared/services/destroy-obs/destroy-obs.service';
import { Router } from '@angular/router';
import { addToFavoriteAction } from '@shared/modules/add-to-favorite/store/actions/add-to-favorite.action';

@Component({
  selector: 'mc-add-to-favorite',
  templateUrl: './add-to-favorite.component.html',
  styleUrls: ['./add-to-favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToFavoriteComponent implements OnInit, OnDestroy {
  @Input('slug') slugProps: string;
  @Input('isFavorited') isFavoritedProps: boolean;
  @Input('favoritesCount') favoritesCountProps: number;

  isLoggedIn$: boolean | null;
  favoritesCount: number;
  isFavorited: boolean;

  constructor(
    private store: Store<IAppState>,
    private destroy$: DestroyObsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public initializeValues(): void {
    this.favoritesCount = this.favoritesCountProps;
    this.isFavorited = this.isFavoritedProps;
  }

  private initializeListeners(): void {
    this.store
      .pipe(
        select(isLoggedInSelector),
        filter(Boolean),
        takeUntil(this.destroy$),
      )
      .subscribe((isLoggedIn) => {
        this.isLoggedIn$ = isLoggedIn;
      });
  }
  public handleLike() {
    if (!this.isLoggedIn$) {
      this.router.navigate(['/login']);
      return;
    }

    this.store.dispatch(
      addToFavoriteAction({
        isFavorited: this.isFavorited,
        slug: this.slugProps,
      }),
    );

    this.favoritesCount += this.isFavorited ? -1 : 1;
    this.isFavorited = !this.isFavorited;
  }
}
