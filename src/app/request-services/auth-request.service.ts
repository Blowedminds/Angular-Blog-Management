import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable }     from 'rxjs';

import { MainRequestService } from './main-request.service';
import { ApiService }         from '../api.service';

@Injectable()
export class AuthRequestService {

  private headers = this.main.headers

  constructor(
    private main: MainRequestService,
    private http: HttpClient,
    private api: ApiService
  ) { }

  private AUTH_API_URL: string = this.main.mainDomain + this.main.apiDomain

  private AUTH_URL: string = this.AUTH_API_URL + "auth/"

  checkAuthenticated(): Observable<any>
  {
    const url = this.makeUrl('check')

    return this.http
                    .get(url, {headers: this.headers})

  }

  register(data: any): Observable<any>
  {
    const url = this.makeUrl('register');

    return this.http
                    .put(url, JSON.stringify(data), {headers: this.headers})
  }

  login(data: any): Observable<any>
  {
    const url = this.AUTH_URL + "login";

    return this.http
                    .post(url, JSON.stringify(data), {headers: this.headers})
  }

  logout(): Observable<any>
  {
    const url = this.makeUrl('logout');

    return this.http
                    .get(url, {headers: this.headers})
                    .catch(error => this.main.handleError(error))
  }

  makeUrl(url: string): string
  {
    return this.AUTH_URL + url + "?token=" + this.api.getToken();
  }
}
