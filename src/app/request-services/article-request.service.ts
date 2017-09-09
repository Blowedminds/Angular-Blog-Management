import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router }            from '@angular/router';
import { Observable }     from 'rxjs';
import 'rxjs/Rx';

import { MainRequestService }   from './main-request.service'
import { ApiService }           from '../api.service'
@Injectable()
export class ArticleRequestService {

  private headers = this.main.headers

  private mainDomain: string = this.main.mainDomain;

  constructor(
    private http: HttpClient,
    private router: Router,
    private main: MainRequestService,
    private api: ApiService
  ) {
  }

  private API_URL: string = this.mainDomain + this.main.apiDomain + "article/"

  getArticles(): Observable<any>
  {
    const url = this.API_URL + "articles?token=" + this.api.getToken()

    return this.http
                    .get(url, {headers: this.headers})
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  getProperties(): Observable<any>
  {
    const url = this.API_URL + "properties?token=" + this.api.getToken()

    return this.http
                    .get(url, { headers: this.headers })
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  postArticle(data: any): Observable<any>
  {
    const url = this.API_URL + "article?token=" + this.api.getToken()

    data.category = JSON.stringify(data.category)

    return this.http
                    .post(url, JSON.stringify(data), { headers: this.headers })
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  postContent(data: any): Observable<any>
  {
    const url = this.API_URL + "content?token=" + this.api.getToken()

    let formData = new FormData()

    return this.http
                    .post(url, JSON.stringify(data), { headers: this.headers})
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  putContent(data: any): Observable<any>
  {
    const url = this.API_URL + "content?token=" + this.api.getToken()

    let formData = new FormData()

    return this.http
                    .put(url, JSON.stringify(data), { headers: this.headers})
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  putArticle(data:any): Observable<any>
  {
    const url = this.API_URL + "article?token=" + this.api.getToken()

    return this.http
                    .put(url, JSON.stringify(data), {headers: this.headers})
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  deleteArticle(id: number): Observable<any>
  {
    const url = this.API_URL + "article/" + id + "?token=" + this.api.getToken()

    return this.http
                    .delete(url, { headers: this.headers})
                    .map(response  => response)
                    .catch(error => this.main.handleError(error))
  }

  getTrash(): Observable<any>
  {
    const url = this.API_URL + "trash?token=" + this.api.getToken()

    return this.http
                    .get(url, {headers: this.headers})
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  postRestore(id: number): Observable<any>
  {
    const url = this.API_URL + "restore?token=" + this.api.getToken()

    return this.http
                    .post(url, JSON.stringify({id: id}), {headers: this.headers})
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  postForceDelete(id: number, complete: number): Observable<any>
  {
    const url = this.API_URL + "force-delete?token=" + this.api.getToken()

    return this.http
                    .post(url, JSON.stringify({id: id, complete: complete}), {headers: this.headers})
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  getPermission(article_id: number): Observable<any>
  {
    const url = this.API_URL + "permission/"+ article_id +"?token=" + this.api.getToken()

    return this.http
                    .get(url, {headers: this.headers})
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  putPermission(article_id: number, change_have_permission: Array<any>, change_not_have_permission: Array<any>): Observable<any>
  {
    const url = this.API_URL + "permission/"+ article_id +"?token=" + this.api.getToken()

    return this.http
                    .put(url, JSON.stringify({have_permission: change_have_permission, not_have_permission: change_not_have_permission}),{headers: this.headers})
                    .map(response => response)
                    .catch(error => this.main.handleError(error))
  }
}
