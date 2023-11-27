import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map, Observable } from 'rxjs';
import { IUserProfile } from '@shared/types/profile.interface';
import { IGetUserProfileResponse } from '@app/user-profile/types/get-user-profile-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getUserProfile(slug: string): Observable<IUserProfile> {
    const url = `${this.apiUrl}/profiles/${slug}`;

    return this.http
      .get<IGetUserProfileResponse>(url)
      .pipe(map((response: IGetUserProfileResponse) => response.profile));
  }
}
