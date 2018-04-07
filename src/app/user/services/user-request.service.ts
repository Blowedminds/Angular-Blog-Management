import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HelpersService, MainRequestService, RoutingListService } from '../imports';

@Injectable()
export class UserRequestService extends MainRequestService {

  constructor(
    http: HttpClient,
    helpersService: HelpersService,
    routingListService: RoutingListService
  )
  {
    super(http, helpersService, routingListService);
  }

  getUserProfile(): Observable<any>
  {
    const url = this.makeUrl('user.profile')

    return this.http
                    .get( url, this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }

  postUserProfile(data: any): Observable<any>
  {
    const url = this.makeUrl('user.profile')

    return this.http
                    .post( url, data, this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }

  postUserProfileImage(file: any): Observable<any>
  {
    const url = this.makeUrl('user.profile-image')

    const formData = new FormData();

    formData.append('file', file);

    return this.http
                    .post( url, formData, { headers: new HttpHeaders({
                        'enctype': 'multipart/form-data',
                        'X-Requested-With': 'XMLHttpRequest'
                      }),
                      params: {
                        token: this.helpersService.getToken()
                      }
                    }
                    ).pipe(catchError(error => this.handleError(error)));
  }

  adminPanel(): Observable<any>{

    const url = this.makeUrl('user.management')

    return this.http
                    .get(url, this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }

  getMenus(): Observable<any>
  {
    const url = this.makeUrl('user.menus')

    return this.http
                    .get(url, this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }

  dashboard(): Observable<any>{

    const url = this.makeUrl('user.dashboard');

    return this.http
                    .get(url, this.options)
                    .pipe(catchError(error => this.handleError(error)));
  }
}
