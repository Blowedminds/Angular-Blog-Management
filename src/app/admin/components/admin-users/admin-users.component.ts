import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AdminRequestService } from '../../services/admin-request.service';

@Component({
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.sass']
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  users: any;

  subs = new Subscription();

  get isPageReady() {
    return !!this.users;
  }

  constructor(
    private adminRequestService: AdminRequestService
  ) { }

  ngOnInit() {
    const rq1 = this.adminRequestService.getUsers().subscribe(response => this.users = response);

    this.subs.add(rq1);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
