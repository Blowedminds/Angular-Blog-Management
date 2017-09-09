import { Component, OnInit } from '@angular/core';

import { ApiService }        from '../../api.service'
import { AdminRequestService }  from '../../request-services/admin-request.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(
    private api: ApiService,
    private adminRequestService: AdminRequestService
  ) { }

  dashboard: any;

  ngOnInit() {

    this.adminRequestService.dashboard().subscribe(response => this.dashboard = response)
  }

}
