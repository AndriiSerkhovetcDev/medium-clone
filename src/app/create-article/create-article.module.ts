import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from '@app/create-article/components/create-article/create-article.component';
import { RouterModule } from '@angular/router';
import { ArticleFormModule } from '@shared/modules/article-form/article-form.module';
import { EffectsModule } from '@ngrx/effects';
import { CreateArticleEffect } from '@app/create-article/store/effects/create-article.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@app/create-article/store/reducers/reducers';

const routers = [
  {
    path: 'articles/new',
    component: CreateArticleComponent,
  },
];

@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routers),
    ArticleFormModule,
    EffectsModule.forFeature([CreateArticleEffect]),
    StoreModule.forFeature('createArticle', reducers),
  ],
})
export class CreateArticleModule {}
