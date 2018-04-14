import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AdminRequestService } from '../../services/admin-request.service';
import { CacheService } from '../../imports';

@Component({
  selector: 'admin-user-add',
  templateUrl: './admin-user-add.component.html',
  styleUrls: ['./admin-user-add.component.sass']
})
export class AdminUserAddComponent implements OnInit, OnDestroy {

  roles: any;

  subs = new Subscription();

  get isPageReady() {
    return !!this.roles;
  }

  constructor(
    private adminRequestService: AdminRequestService,
    private cacheService: CacheService
  ) { }

  ngOnInit() {
    const rq1 = this.cacheService.get('roles', this.adminRequestService.makeGetRequest('admin.roles'))
      .subscribe(response => this.roles = response);

    this.subs.add(rq1);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  submitForm(f: NgForm) {
    const user = {
      name: f.value.name,
      email: f.value.email,
      password: f.value.password,
      password_confirmation: f.value.password_confirmation,
      role_id: f.value.role_id
    };

    const rq1 = this.adminRequestService.putUser(user).subscribe(response => alert(response));

    this.subs.add(rq1);
  }
}
