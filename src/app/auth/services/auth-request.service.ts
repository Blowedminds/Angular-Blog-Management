import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router }            from '@angular/router';
import { Observable }     from 'rxjs';

import { HelpersService, MainRequestService, RoutingListService }   from '../imports';

@Injectable()
export class AuthRequestService extends MainRequestService{

  constructor(
    http: HttpClient,
    helpersService: HelpersService,
    routingListService: RoutingListService
  )
  {
    super(http, helpersService, routingListService);
  }

  checkAuthenticated(): Observable<any>
  {
    const url = this.makeUrl('auth.is-authenticated')

    return this.http
                    .get(url, this.options)

  }

  register(data: any): Observable<any>
  {
    const url = this.makeUrl('auth.register');

    return this.http
                    .put(url, JSON.stringify(data), this.options)
  }

  login(data: any): Observable<any>
  {
    const url = this.makeUrl('auth.login');

    return this.http
                    .post(url, JSON.stringify(data), this.options)
  }

  logout(): Observable<any>
  {
    const url = this.makeUrl('auth.logout');

    return this.http
                    .get(url, this.options)
                    .catch(error => this.handleError(error))
  }
}
