import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IArticle } from '@shared/types/article.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public addToFavorite(slug: string): Observable<IArticle> {
    const fullApi = this.getUrl(slug);

    return this.http.post<IArticle>(fullApi, {});
  }

  public removeFromFavorite(slug: string): Observable<IArticle> {
    const fullApi = this.getUrl(slug);

    return this.http.delete<IArticle>(fullApi);
  }

  private getUrl(slug: string): string {
    return `${this.apiUrl}/articles/${slug}/favorite`;
  }
}
