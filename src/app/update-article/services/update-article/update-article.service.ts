import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { IArticleInput } from '@shared/types/article-input.interface';
import { map, Observable } from 'rxjs';
import { IArticle } from '@shared/types/article.interface';
import { ISaveArticleResponse } from '@shared/types/save-article.response.interface';

@Injectable({
  providedIn: 'root',
})
export class UpdateArticleService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public updateArticle(
    articleInput: IArticleInput,
    slug: string,
  ): Observable<IArticle> {
    const fullUrl = `${this.apiUrl}/articles/${slug}`;
    return this.http
      .put<ISaveArticleResponse>(fullUrl, { article: articleInput })
      .pipe(
        map((response: ISaveArticleResponse) => {
          return response.article;
        }),
      );
  }
}
