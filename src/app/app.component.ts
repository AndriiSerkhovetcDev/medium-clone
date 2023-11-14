import { Component, OnInit } from '@angular/core';
import { IAppState } from '@shared/types/appState.interface';
import { Store } from '@ngrx/store';
import { getCurrentUserAction } from '@auth/store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
  }
}
