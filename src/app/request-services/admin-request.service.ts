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
  ) { }

  private headers = this.main.headers

  private mainDomain: string = this.main.mainDomain;

  private API_URL: string = this.mainDomain + this.main.apiDomain + "panel/"


  public getMenus():Observable<any>
  {
    const url = this.makeRequest("menus")

    return this.http
                  .get(url, {headers: this.headers })
                  .catch(error => this.main.handleError(error))
  }

  public getCategories():Observable<any>
  {
    const url = this.makeRequest("categories")

    return this.http
                  .get(url, {headers: this.headers })
                  .catch(error => this.main.handleError(error))
  }

  public getLanguages():Observable<any>
  {
    const url = this.makeRequest("languages")

    return this.http
                    .get(url, { headers: this.headers })
                    .catch(error => this.main.handleError(error))
  }

  public postLanguage(data: any):Observable<any>
  {
    const url = this.makeRequest("languages")

    return this.http
                    .post(url, JSON.stringify(data), { headers: this.headers })
                    .catch(error => this.main.handleError(error))
  }

  public putLanguage(data: any):Observable<any>
  {
    const url = this.makeRequest("languages")

    return this.http
                    .put(url, JSON.stringify(data), { headers: this.headers })
                    .catch(error => this.main.handleError(error))
  }

  public deleteLanguage(id: number):Observable<any>
  {
    const url = this.makeRequest("languages/" + id)

    return this.http
                    .delete(url, { headers: this.headers })
                    .catch(error => this.main.handleError(error))
  }

  public postCategory(data: any):Observable<any>
  {
    const url = this.makeRequest("categories")

    return this.http
                    .post(url, JSON.stringify(data), { headers: this.headers })
                    .catch(error => this.main.handleError(error))
  }

  public putCategory(data: any):Observable<any>
  {
    const url = this.makeRequest("categories")

    return this.http
                    .put(url, JSON.stringify(data), { headers: this.headers })
                    .catch(error => this.main.handleError(error))
  }

  public deleteCategory(id: number):Observable<any>
  {
    const url = this.makeRequest("categories/" + id)

    return this.http
                    .delete(url, { headers: this.headers })
                    .catch(error => this.main.handleError(error))
  }

  public postMenu(data: any):Observable<any>
  {
    const url = this.makeRequest("menus")

    return this.http
                    .post(url, JSON.stringify(data), { headers: this.headers })
                    .catch(error => this.main.handleError(error))
  }

  public putMenu(data: any):Observable<any>
  {
    const url = this.makeRequest("menus")

    return this.http
                    .put(url, JSON.stringify(data), { headers: this.headers })
                    .catch(error => this.main.handleError(error))
  }

  public deleteMenu(id: number):Observable<any>
  {
    const url = this.makeRequest("menus/" + id)

    return this.http
                    .delete(url, { headers: this.headers })
                    .catch(error => this.main.handleError(error))
  }

  private makeRequest(url: string)
  {
    return this.API_URL + url + "?token=" + this.api.getToken()
  }

}
