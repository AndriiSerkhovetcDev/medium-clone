import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { IArticleInput } from '@shared/types/article-input.interface';
import { ISaveArticleResponse } from '@shared/types/save-article.response.interface';
import { map, Observable } from 'rxjs';
import { IArticle } from '@shared/types/article.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateArticleService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public createArticle(articleInput: IArticleInput): Observable<IArticle> {
    const fullUrl = `${this.apiUrl}/articles`;
    return this.http
      .post<ISaveArticleResponse>(fullUrl, { article: articleInput })
      .pipe(
        map((response: ISaveArticleResponse) => {
          return response.article;
        }),
      );
  }
}
