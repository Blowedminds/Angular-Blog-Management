import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HelpersService, MainRequestService, RoutingListService } from '../imports';

@Injectable()
export class AdminRequestService extends MainRequestService {

  constructor(
    http: HttpClient,
    helpersService: HelpersService,
    routingListService: RoutingListService
  )
  {
    super(http, helpersService, routingListService);
  }

  getMenus(): Observable<any>
  {
    const url = this.makeUrl('admin.menus');

    return this.http
                  .get(url, this.options)
                  .pipe(catchError(error => this.handleError(error)));
  }

  postMenu(data: any): Observable<any>
  {
    const url = this.makeUrl('admin.menus');

    return this.http
                    .post(url, JSON.stringify(data), this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }

  putMenu(data: any): Observable<any>
  {
    const url = this.makeUrl('admin.menus');

    return this.http
                    .put(url, JSON.stringify(data), this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }

  deleteMenu(id: number): Observable<any>
  {
    const url = this.makeUrl('admin.menus', `${id}`);

    return this.http
                    .delete(url, this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }

  getLanguages(): Observable<any>
  {
    const url = this.makeUrl('admin.languages');

    return this.http
                    .get(url, this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }

  postLanguage(data: any): Observable<any>
  {
    const url = this.makeUrl('admin.languages');

    return this.http
                    .post(url, JSON.stringify(data), this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }

  putLanguage(data: any): Observable<any>
  {
    const url = this.makeUrl('admin.languages');

    return this.http
                    .put(url, JSON.stringify(data), this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }

  deleteLanguage(id: number): Observable<any>
  {
    const url = this.makeUrl('admin.languages', `${id}`);

    return this.http
                    .delete(url, this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }

  getCategories(): Observable<any>
  {
    const url = this.makeUrl('admin.categories');

    return this.http
                  .get(url, this.options)
                  .pipe(catchError(error => this.handleError(error)));
  }

  postCategory(data: any, id: number): Observable<any>
  {
    const url = this.makeUrl('admin.categories', `${id}`);

    return this.http
                    .post(url, JSON.stringify(data), this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }

  putCategory(data: any): Observable<any>
  {
    const url = this.makeUrl('admin.categories');

    return this.http
                    .put(url, JSON.stringify(data), this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }

  deleteCategory(id: number): Observable<any>
  {
    const url = this.makeUrl('admin.categories', `${id}`);

    return this.http
                    .delete(url, this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }
}
