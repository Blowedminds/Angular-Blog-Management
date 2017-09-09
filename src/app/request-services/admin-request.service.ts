import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Router }            from '@angular/router';
import { Observable }     from 'rxjs';
import 'rxjs/Rx';

import { MainRequestService }   from './main-request.service'
import { ApiService }           from '../api.service'
@Injectable()
export class AdminRequestService {


  constructor(
    private http: HttpClient,
    private router: Router,
    private main: MainRequestService,
    private api: ApiService
  )
  {
  }

  private headers = this.main.headers

  private mainDomain: string = this.main.mainDomain;

  private API_URL: string = this.mainDomain + this.main.apiDomain


  userInfo(): Observable<any>
  {
    const url = this.API_URL + "user-info?token=" + this.api.getToken()

    return this.http
                    .get( url, { headers: this.main.headers})
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  adminPanel(): Observable<any>{

    const url = this.API_URL + 'management?token=' + this.api.getToken();

    return this.http
                    .get(url, { headers: this.headers})
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  getMenus(): Observable<any>
  {
    const url = this.API_URL + "menus?token=" + this.api.getToken()

    return this.http
                    .get(url, { headers: this.headers})
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  dashboard(): Observable<any>{

    const url = this.API_URL + 'dashboard?token=' + this.api.getToken();

    return this.http
                    .get(url, { headers: this.headers})
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

}
