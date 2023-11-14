import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegisterRequest } from '../../types/registerRequest.interface';
import { map, Observable } from 'rxjs';
import { ICurrentUser } from '@shared/types/currentUser.interface';
import { environment } from '@environments/environment';
import { IAuthResponse } from '../../types/authResponse.interface';
import { ILoginRequest } from '@auth/types/loginRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getUser(response: IAuthResponse): ICurrentUser {
    return response.user;
  }

  public register(data: IRegisterRequest): Observable<ICurrentUser> {
    const api = `${this._apiUrl}/users`;

    return this.http.post<IAuthResponse>(api, data).pipe(map(this.getUser));
  }

  public login(data: ILoginRequest): Observable<ICurrentUser> {
    const api = `${this._apiUrl}/users/login`;

    return this.http.post<IAuthResponse>(api, data).pipe(map(this.getUser));
  }

  public getCurrentUser(): Observable<ICurrentUser> {
    const api = `${this._apiUrl}/user`;

    return this.http.get<IAuthResponse>(api).pipe(map(this.getUser));
  }
}
