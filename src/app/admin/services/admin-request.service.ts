import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable }     from 'rxjs';

import { HelpersService, MainRequestService, RoutingListService }   from '../imports';

@Injectable()
export class AdminRequestService extends MainRequestService {

  constructor(
    http: HttpClient,
    helpersService: HelpersService,
    routingListService: RoutingListService
  )
  {
    super(http, helpersService, routingListService)
  }

  public getMenus():Observable<any>
  {
    const url = this.makeUrl('admin.menus');

    return this.http
                  .get(url, this.options)
                  .catch(error => this.handleError(error))
  }

  public postMenu(data: any):Observable<any>
  {
    const url = this.makeUrl('admin.menus');

    return this.http
                    .post(url, JSON.stringify(data), this.options)
                    .catch(error => this.handleError(error))
  }

  public putMenu(data: any):Observable<any>
  {
    const url = this.makeUrl('admin.menus');

    return this.http
                    .put(url, JSON.stringify(data), this.options)
                    .catch(error => this.handleError(error))
  }

  public deleteMenu(id: number):Observable<any>
  {
    const url = this.makeUrl('admin.menus', `${id}`);

    return this.http
                    .delete(url, this.options)
                    .catch(error => this.handleError(error))
  }

  public getLanguages():Observable<any>
  {
    const url = this.makeUrl('admin.languages');

    return this.http
                    .get(url, this.options)
                    .catch(error => this.handleError(error))
  }

  public postLanguage(data: any):Observable<any>
  {
    const url = this.makeUrl('admin.languages');

    return this.http
                    .post(url, JSON.stringify(data), this.options)
                    .catch(error => this.handleError(error))
  }

  public putLanguage(data: any):Observable<any>
  {
    const url = this.makeUrl('admin.languages');

    return this.http
                    .put(url, JSON.stringify(data), this.options)
                    .catch(error => this.handleError(error))
  }

  public deleteLanguage(id: number):Observable<any>
  {
    const url = this.makeUrl('admin.languages', `${id}`);

    return this.http
                    .delete(url, this.options)
                    .catch(error => this.handleError(error))
  }

  public getCategories():Observable<any>
  {
    const url = this.makeUrl('admin.categories');

    return this.http
                  .get(url, this.options)
                  .catch(error => this.handleError(error))
  }

  public postCategory(data: any, id: number):Observable<any>
  {
    const url = this.makeUrl('admin.categories', `${id}`);

    return this.http
                    .post(url, JSON.stringify(data), this.options)
                    .catch(error => this.handleError(error))
  }

  public putCategory(data: any):Observable<any>
  {
    const url = this.makeUrl('admin.categories');

    return this.http
                    .put(url, JSON.stringify(data), this.options)
                    .catch(error => this.handleError(error))
  }

  public deleteCategory(id: number):Observable<any>
  {
    const url = this.makeUrl('admin.categories', `${id}`);

    return this.http
                    .delete(url, this.options)
                    .catch(error => this.handleError(error))
  }
}
