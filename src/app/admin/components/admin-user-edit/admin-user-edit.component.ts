import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AdminRequestService } from '../../services/admin-request.service';
import { CacheService } from '../../imports';

@Component({
  selector: 'admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.sass']
})
export class AdminUserEditComponent implements OnInit, OnDestroy {

  user: any;

  roles: any;

  subs = new Subscription();

  get isPageReady() {
    return this.roles && this.user;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminRequestService: AdminRequestService,
    private cacheService: CacheService,
  ) { }

  ngOnInit() {

    const rq2 = this.activatedRoute.params.pipe(
      switchMap((params: Params) => this.adminRequestService.getUser(params['user_id']))
    ).subscribe(response => this.user = response);

    const rq1 = this.cacheService.get('roles', this.adminRequestService.makeGetRequest('admin.roles'))
      .subscribe(response => this.roles = response);

    this.subs.add(rq1);
    this.subs.add(rq2);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  submitForm(f: NgForm) {
    const user = {
      name: f.value.name,
      email: f.value.email,
      role_id: f.value.role_id
    };

    const rq1 = this.adminRequestService.postUser(user, this.user.user_id).subscribe(response => alert(response));

    this.subs.add(rq1);
  }

  deleteUser(user_id: string) {
    const rq1 = this.adminRequestService.deleteUser(user_id).subscribe( response => alert(response));

    this.subs.add(rq1);
  }
}
