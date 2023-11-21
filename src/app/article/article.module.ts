import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './components/article/article.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { ErrorMessageModule } from '@shared/modules/error-message/error-message.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { GetArticleEffect } from '@app/article/store/effects/get-article.effect';
import { reducers } from '@app/article/store/reducers/reducers';

const routes = [{ path: 'articles/:slug', component: ArticleComponent }];

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule.forChild(routes),
    ErrorMessageModule,
    LoadingModule,
  ],
  exports: [],
})
export class ArticleModule {}
