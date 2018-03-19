import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HelpersService } from './helpers.service';
import { RoutingListService } from './routing-list.service';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class MainRequestService {

  public MAIN_URI: string = environment.apiUrl;

  public PUBLIC_IMAGE_URL: string = "images/";

  get options()
  {
    this._options.params.token = this.helpersService.getToken()

    return this._options;
  }

  protected USER_API_URL: string = "user/";

  private _options: any = {
    headers:  new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Socket-ID': ''
    }),
    params: {
      token: null
    }
  }

  constructor(
    protected http: HttpClient,
    protected helpersService: HelpersService,
    protected routingListService: RoutingListService
  ) { }

  makeGetRequest(key: string)
  {
    const url = this.makeUrl(key)

    return this.http
                .get(url, this.options)
                .catch(error => this.handleError(error));
  }

  makeUrl(key: string, url?: string): string
  {
    return this.MAIN_URI + this.routingListService.getUrl(key) + (url || '');
  }

  protected getToken(): string
  {
    return this.helpersService.getToken()
  }

  protected handleError(error: any, router: any = null): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only

    switch (error.status){
      case 401:
        this.helpersService.navigate(['login']);
        break;
      case 421:
        this.helpersService.navigate([error.link]);
        break;
    }
    return Promise.reject(error.message || error);
  }
}