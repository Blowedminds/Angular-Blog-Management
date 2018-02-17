import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable }     from 'rxjs';

import { MainRequestService }   from './main-request.service'
import { ApiService }           from '../api.service'
@Injectable()
export class UserRequestService {


  constructor(
    private http: HttpClient,
    public main: MainRequestService,
    private api: ApiService
  )
  {
  }

  private headers = this.main.headers

  private mainDomain: string = this.main.mainDomain;

  private API_URL: string = this.mainDomain + "user/"

  getUserProfile(): Observable<any>
  {
    const url = this.makeRequestUrl('profile')

    return this.http
                    .get( url, { headers: this.main.headers})
                    .catch(error => this.main.handleError(error))
  }

  postUserProfile(data: any): Observable<any>
  {
    const url = this.makeRequestUrl('profile')

    return this.http
                    .post( url, data, { headers: this.main.headers})
                    .catch(error => this.main.handleError(error))
  }

  postUserProfileImage(file: any): Observable<any>
  {
    const url = this.makeRequestUrl('profile-image')

    let formData = new FormData()

    formData.append('file', file)

    return this.http
                    .post( url, formData, { headers: new HttpHeaders({
                        "enctype": "multipart/form-data",
                        'X-Requested-With': 'XMLHttpRequest'
                      })}
                    ).catch(error => this.main.handleError(error))
  }

  adminPanel(): Observable<any>{

    const url = this.API_URL + 'management?token=' + this.api.getToken();

    return this.http
                    .get(url, { headers: this.headers})
                    .catch(error => this.main.handleError(error))
  }

  getMenus(): Observable<any>
  {
    const url = this.API_URL + "menus?token=" + this.api.getToken()

    return this.http
                    .get(url, { headers: this.headers})
                    .catch(error => this.main.handleError(error))
  }

  dashboard(): Observable<any>{

    const url = this.API_URL + 'dashboard?token=' + this.api.getToken();

    return this.http
                    .get(url, { headers: this.headers})
                    .catch(error => this.main.handleError(error))
  }


  getGlobalData(): Observable<any>
  {
    const url = this.main.mainDomain + this.main.apiDomain + "global-data?token=" + this.api.getToken()

    return this.http
                    .get(url, {headers: this.headers})
                    .catch(error => this.main.handleError(error))
  }

  private makeRequestUrl(url: string)
  {
    return this.API_URL + url + "?token=" + this.api.getToken()
  }

}
