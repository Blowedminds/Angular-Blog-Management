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
  ) {
    super(http, helpersService, routingListService);
  }

  getUsers(): Observable<any> {
    return this.makeGetRequest('admin.users');
  }

  postUser(data: any, id: number): Observable<any> {
    return this.makePostRequest('admin.users', data, `${id}`);
  }

  putUser(data: any): Observable<any> {
    return this.makePutRequest('admin.users', data);
  }

  deleteUser(id: number): Observable<any> {
    return this.makeDeleteRequest('admin.users', `${id}`);
  }

  getMenus(): Observable<any> {
    return this.makeGetRequest('admin.menus');
  }

  postMenu(data: any): Observable<any> {
    return this.makePostRequest('admin.menus', data);
  }

  putMenu(data: any): Observable<any> {
    return this.makePutRequest('admin.menus', data);
  }

  deleteMenu(id: number): Observable<any> {
    return this.makeDeleteRequest('admin.menus', `${id}`);
  }

  getLanguages(): Observable<any> {
    return this.makeGetRequest('admin.languages');
  }

  postLanguage(data: any): Observable<any> {
    return this.makePostRequest('admin.languages', data);
  }

  putLanguage(data: any): Observable<any> {
    return this.makePutRequest('admin.languages', data);
  }

  deleteLanguage(id: number): Observable<any> {
    return this.makeDeleteRequest('admin.languages', `${id}`);
  }

  getCategories(): Observable<any> {
    return this.makeGetRequest('admin.categories');
  }

  postCategory(data: any, id: number): Observable<any> {
    return this.makePostRequest('admin.categories', data, `${id}`);
  }

  putCategory(data: any): Observable<any> {
    return this.makePutRequest('admin.categories', data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.makeDeleteRequest('admin.categories', `${id}`);
  }
}
