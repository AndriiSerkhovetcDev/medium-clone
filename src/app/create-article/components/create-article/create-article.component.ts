import { Component, OnInit } from '@angular/core';
import { IArticleInput } from '@shared/types/article-input.interface';
import { IBackendErrors } from '@auth/types/backendErrors.interface';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@shared/types/appState.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '@app/create-article/store/selectors/selectors';
import { createArticleAction } from '@app/create-article/store/actions/create-article.action';

@Component({
  selector: 'mc-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  public initialValues: IArticleInput = {
    title: '',
    description: '',
    body: '',
    tagList: [''],
  };
  public isSubmitting$: Observable<boolean>;
  public errors$: Observable<IBackendErrors | null>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  private initializeValues(): void {
    console.log('initializeValues');
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.errors$ = this.store.pipe(select(validationErrorsSelector));
  }

  public onSubmit(articleInput: IArticleInput): void {
    this.store.dispatch(createArticleAction({ articleInput }));
  }
}
