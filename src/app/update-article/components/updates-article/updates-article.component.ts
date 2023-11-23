import { Component, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { IBackendErrors } from '@auth/types/backendErrors.interface';
import { IAppState } from '@shared/types/appState.interface';
import { select, Store } from '@ngrx/store';
import { IArticleInput } from '@shared/types/article-input.interface';
import { ActivatedRoute } from '@angular/router';

import { updateArticleAction } from '@app/update-article/strore/actions/update-article.action';
import { IArticle } from '@shared/types/article.interface';
import {
  articleSelector,
  isLoadingSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from '@app/update-article/strore/selectors/selectors';
import { getArticleAction } from '@app/update-article/strore/actions/get-article.action';

@Component({
  selector: 'mc-updates-article',
  templateUrl: './updates-article.component.html',
  styleUrls: ['./updates-article.component.scss'],
})
export class UpdatesArticleComponent implements OnInit {
  public initialValues$: Observable<IArticleInput>;
  public isSubmitting$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public errors$: Observable<IBackendErrors | null>;
  public slug: string;

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchArticle();
  }

  private initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: IArticle) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      }),
    );

    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.errors$ = this.store.pipe(select(validationErrorsSelector));
  }

  private fetchArticle(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }
  public onSubmit(articleInput: IArticleInput): void {
    this.store.dispatch(updateArticleAction({ articleInput, slug: this.slug }));
  }
}
