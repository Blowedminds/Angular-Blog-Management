import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AdminRequestService } from '../../services/admin-request.service';
import { CacheService } from '../../imports';

@Component({
  selector: 'app-admin-menus',
  templateUrl: './admin-menus.component.html',
  styleUrls: ['./admin-menus.component.sass']
})
export class AdminMenusComponent implements OnInit, OnDestroy {

  menus: any;

  edit_menu: any;

  subs = new Subscription();

  languages: any;

  roles: Array<any> = [];

  has_roles: Array<any> = [];

  not_has_roles: Array<any> = [];

  default_menu: any = {
    id: null,
    name: {},
    tooltip: {},
    url: null,
    weight: null,
    parent: null,
    roles: []
  };

  get isPageReady() {
    return this.menus && this.languages && this.roles;
  }

  constructor(
    private adminRequestService: AdminRequestService,
    private cacheService: CacheService
  ) { }

  ngOnInit() {
    const rq1 = this.adminRequestService.getMenus().subscribe(response => this.menus = response);

    const rq2 = this.cacheService.get('languages', this.adminRequestService.makeGetRequest('admin.languages'))
      .subscribe(response => {
        this.languages = response;

        for (const one of this.languages) {
          this.default_menu.name[one] = null;
          this.default_menu.tooltip[one] = null;
        }

      });

    const rq3 = this.cacheService.get('roles', this.adminRequestService.makeGetRequest('admin.roles'))
      .subscribe(response => this.roles = response);

    // this.subs.add(rq1).add(rq2);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  submitForm(f: NgForm) {
    const menu = {
      id: f.value.id,
      name: this.edit_menu.name,
      tooltip: this.edit_menu.tooltip,
      url: f.value.url,
      weight: f.value.weight,
      parent: f.value.parent,
      roles: this.has_roles
    };

    let rq1;

    if (menu.id) {

      rq1 = this.adminRequestService.postMenu(menu).subscribe(response => this.refreshComponent());
    } else {

      rq1 = this.adminRequestService.putMenu(menu).subscribe(response => this.refreshComponent());
    }

    this.subs.add(rq1);
  }

  deleteMenu(id: number) {
    const rq4 = this.adminRequestService.deleteMenu(id).subscribe(response => this.refreshComponent());

    this.subs.add(rq4);
  }

  refreshComponent() {
    this.menus = null;

    this.roles = null;

    this.edit_menu = null;

    const rq1 = this.adminRequestService.getMenus().subscribe(response => {
      this.menus = response.menus;
      this.roles = response.roles;
    });

    this.subs.add(rq1);
  }

  selectMenu(menu: any) {
    this.edit_menu = menu;
    console.log(this.edit_menu);
    this.filterRoles(menu.roles);
  }

  filterRoles(roles) {
    this.has_roles = [];

    this.not_has_roles = [];

    this.has_roles = this.roles.filter(role => {

      role.changed = false;

      for (const one of roles) {

        if (one.id === role.id) {

          return true;
        }
      }

      this.not_has_roles.push(role);

      return false;
    });

    this.sortRoles();
  }

  addRole(id: number) {
    this.changeRole(id, this.has_roles, this.not_has_roles);
  }

  discardRole(id: number) {
    this.changeRole(id, this.not_has_roles, this.has_roles);
  }

  changeRole(id: number, add: any, sub: any) {
    const index = sub.findIndex(role => role.id === id);

    sub[index].changed = !sub[index].changed;

    add.push(sub[index]);

    sub.splice(index, 1);

    this.sortRoles();
  }

  sortRoles() {
    this.has_roles.sort((a, b) => a.id - b.id);

    this.not_has_roles.sort((a, b) => a.id - b.id);
  }
}
