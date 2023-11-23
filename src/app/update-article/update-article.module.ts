import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatesArticleComponent } from './components/updates-article/updates-article.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { UpdateArticleEffect } from '@app/update-article/strore/effects/update-article.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@app/update-article/strore/reducers/reducers';
import { ArticleFormModule } from '@shared/modules/article-form/article-form.module';
import { GetArticleEffect } from '@app/update-article/strore/effects/get-article.effect';
import { LoadingModule } from '@shared/modules/loading/loading.module';

const routes = [
  {
    path: 'articles/:slug/edit',
    component: UpdatesArticleComponent,
  },
];

@NgModule({
  declarations: [UpdatesArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    StoreModule.forFeature('updateArticle', reducers),
    ArticleFormModule,
    LoadingModule,
  ],
})
export class UpdateArticleModule {}
