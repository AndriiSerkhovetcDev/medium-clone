import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetFeedResponse } from '../types/get-feed-response.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  public getFeed(url: string): Observable<IGetFeedResponse> {
    const api = `${this.apiUrl}${url}`

    return this.http.get<IGetFeedResponse>(api)
  }
}
