import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGetPopularTagsResponse } from '@shared/modules/popular-tags/types/get-popular-tags-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PopularTagsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getPopularTags(url: string): Observable<IGetPopularTagsResponse> {
    const api = `${this.apiUrl}${url}`;

    return this.http.get<IGetPopularTagsResponse>(api);
  }
}
