import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegisterRequest } from '../../types/registerRequest.interface';
import { map, Observable } from 'rxjs';
import { ICurrentUser } from '../../../shared/types/currentUser.interface';
import { environment } from '../../../../environments/environment';
import { IAuthResponse } from '../../types/authResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public register(data: IRegisterRequest): Observable<ICurrentUser> {
    const api = `${this._apiUrl}/users`;

    return this.http
      .post<IAuthResponse>(api, data)
      .pipe(map((response: IAuthResponse): ICurrentUser => response.user));
  }
}
