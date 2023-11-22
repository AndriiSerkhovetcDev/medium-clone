import { Component, OnInit } from '@angular/core';
import { IAppState } from '@shared/types/appState.interface';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { getArticleAction } from '@app/article/store/actions/get-article.action';
import { combineLatestWith, map, Observable, of } from 'rxjs';
import { IArticle } from '@shared/types/article.interface';
import {
  articleSelector,
  errorSelector,
  isLoadingSelector,
} from '@app/article/store/selectors/selectors';
import { currentUserSelector } from '@auth/store/selectors/selectors';
import { ArticleService } from '@app/article/services/article/article.service';
import { deleteArticleAction } from '@app/article/store/actions/delete-article.action';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  private slug: string;
  public article$: Observable<IArticle>;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string>;
  public isAuthor$: Observable<boolean>;
  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private articleService: ArticleService,
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchArticle();
  }

  private initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.article$ = this.store.pipe(select(articleSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = of(true);
  }

  private isAuthor(): Observable<boolean> {
    return this.article$.pipe(
      combineLatestWith(this.store.pipe(select(currentUserSelector))),
      map(
        ([article, currentUser]) =>
          article.author.username === currentUser.username,
      ),
    );
  }

  private fetchArticle(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  public deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({ slug: this.slug }));
  }
}
