import { Component, OnInit } from '@angular/core';

import { ApiService }        from '../../api.service'
import { UserRequestService }  from '../../request-services/user-request.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(
    private api: ApiService,
    private UserRequestService: UserRequestService
  ) { }

  dashboard: any;

  ngOnInit() {

    let rq1 = this.UserRequestService.dashboard().subscribe(response => {
      this.dashboard = response
      rq1.unsubscribe()
      rq1 = null
    })
  }

}
