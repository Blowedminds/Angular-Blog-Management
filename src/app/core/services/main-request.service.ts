import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HelpersService } from './helpers.service';
import { RoutingListService } from './routing-list.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class MainRequestService {

  public MAIN_URI: string = environment.apiUrl;

  get options() {
    this._options.params.token = this.helpersService.getToken();

    return this._options;
  }

  private _options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      // 'X-Socket-ID': ''
    }),
    params: {
      token: null
    }
  };

  constructor(
    protected http: HttpClient,
    protected helpersService: HelpersService,
    protected routingListService: RoutingListService
  ) { }

  makeGetRequest(key: string) {
    const url = this.makeUrl(key);

    return this.http
      .get(url, this.options)
      .pipe(catchError(error => this.handleError(error)));
  }

  makeUrl(key: string, url?: string): string {
    const route = this.routingListService.getUrl(key);

    return this.MAIN_URI + route + (url || '');
  }

  protected getToken(): string {
    return this.helpersService.getToken();
  }

  protected handleError(error: any, router: any = null): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only

    switch (error.status) {
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
