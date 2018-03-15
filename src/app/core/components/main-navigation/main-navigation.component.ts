import { Component, OnInit } from '@angular/core';

import { CacheService } from '../../services/cache.service';
import { MainRequestService } from '../../services/main-request.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.sass']
})
export class MainNavigationComponent implements OnInit {

  menus: any;

  user: any;

  constructor(
    private cacheService: CacheService,
    private mainRequestService: MainRequestService
  ) { }

  ngOnInit() {

    this.cacheService.get('menus', this.mainRequestService.makeGetRequest('admin.menus'))
                      .subscribe(response => this.menus = response);

    this.cacheService.get('user', this.mainRequestService.makeGetRequest('user.info'))
                      .subscribe(response => this.user = response);
  }

}
