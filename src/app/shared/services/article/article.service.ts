import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IGetArticleResponse } from '@shared/types/get-article.interface';
import { IArticle } from '@shared/types/article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getArticle(slug: string): Observable<IArticle> {
    const api = `${this.apiUrl}/articles/${slug}`;

    return this.http
      .get<IGetArticleResponse>(api)
      .pipe(map((response: IGetArticleResponse) => response.article));
  }
}
