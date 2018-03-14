import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HelpersService } from './helpers.service';
import { MainRequestService } from './main-request.service';
import { RoutingListService } from './routing-list.service';

@Injectable()
export class CacheRequestService extends MainRequestService{

  constructor(
    http: HttpClient,
    helpersService: HelpersService,
    routingListService: RoutingListService
  )
  {
    super(http, helpersService, routingListService);
  }
}
