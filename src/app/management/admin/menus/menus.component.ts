import { Component, OnInit } from '@angular/core';
import { NgForm }            from '@angular/forms';

import { AdminRequestService }  from '../../../request-services/admin-request.service'

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.sass']
})
export class MenusComponent implements OnInit {

  menus: any

  edit_menu: any

  subs = new Subscription()

  roles: Array<any> = []

  has_roles: Array<any> = []

  not_has_roles: Array<any> = []

  default_menu: any = {
    id: null,
    name: null,
    tooltip: null,
    url: null,
    weight: null,
    parent: null,
    roles: []
  }

  constructor(
    private adminRequest: AdminRequestService
  ) { }

  ngOnInit() {
    let rq1 = this.adminRequest.getMenus().subscribe( response => {
      this.menus = response.menus
      this.roles = response.roles
    })

    this.subs.add(rq1)
  }

  ngOnDestroy()
  {
    this.subs.unsubscribe()
  }

  submitForm(f: NgForm)
  {
    const menu = {
            id: f.value.id,
            name: f.value.name,
            tooltip: f.value.tooltip,
            url: f.value.url,
            weight: f.value.weight,
            parent: f.value.parent,
            roles: this.has_roles
          }

    let rq1;

    if(menu.id)
      rq1 = this.adminRequest.postMenu(menu).subscribe(response => this.refreshComponent())
    else
      rq1 = this.adminRequest.putMenu(menu).subscribe(response => this.refreshComponent())

    this.subs.add(rq1)
  }

  deleteMenu(id: number)
  {
    let rq4 = this.adminRequest.deleteMenu(id).subscribe(response =>  this.refreshComponent())

    this.subs.add(rq4)
  }

  refreshComponent()
  {
    this.menus = null

    this.roles = null

    this.edit_menu = null

    let rq1 = this.adminRequest.getMenus().subscribe( response => {
      this.menus = response.menus
      this.roles = response.roles
    })

    this.subs.add(rq1)
  }

  selectMenu(menu: any)
  {
    this.edit_menu = menu;

    this.filterRoles(menu.roles)
  }

  filterRoles(roles)
  {
    this.has_roles = []

    this.not_has_roles = []

    this.has_roles = this.roles.filter( role => {

      role.changed = false

      for(let one of roles) {

        if(one.id === role.id)
          return true
      }

      this.not_has_roles.push(role)

      return false
    })

    this.sortRoles()
  }

  addRole(id: number)
  {
    this.changeRole(id, this.has_roles, this.not_has_roles)
  }

  discardRole(id: number)
  {
    this.changeRole(id, this.not_has_roles, this.has_roles)
  }

  changeRole(id:number, add: any, sub: any)
  {
    let index = sub.findIndex(role => role.id === id)

    sub[index].changed = !sub[index].changed

    add.push(sub[index])

    sub.splice(index, 1)

    this.sortRoles()
  }

  sortRoles()
  {
    this.has_roles.sort( (a, b) => a.id - b.id)

    this.not_has_roles.sort( (a, b) => a.id - b.id)
  }
}
