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

  selected_one: any

  open_form: boolean = false

  create_new: boolean = false

  subs = new Subscription()

  roles: Array<any> = []

  filtered_role: any

  filtered_not_role: any

  create_new_filtered_role: any

  create_new_filtered_not_role: any

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

  selectPan(i: number)
  {
    if(this.selected_one)
      if(this.selected_one.id === this.menus[i].id){

        this.closePan()

        return
      }

    this.selected_one = this.menus[i]

    this.filtered_not_role =  this.filterRole(i, true)

    this.filtered_role =  this.filterRole(i, false)

    this.open_form = true
  }

  filterRole(i: number, bool: boolean)
  {
    if(bool){
      let array = this.roles

      if(typeof this.menus[i].roles !== "undefined")
        for(let one of this.menus[i].roles)
          array = array.filter( obj => obj.id !== one)

      return array
    }else{
      let array = []
      if(typeof this.menus[i].roles !== "undefined")
        for(let one of this.menus[i].roles)
          array.push(this.roles.find( obj => obj.id === one))

      return array
    }
  }

  deleteRole(i: number)
  {
    this.filtered_not_role.push(this.filtered_role[i])
    this.filtered_role.splice(i, 1)
  }

  addRole(item: any)
  {
    let value = item.selected.value

    if(value == undefined || value == null) return;

    let index = this.roles.findIndex( obj => obj.id === value)

    this.filtered_role.push(this.roles[index])

    this.filtered_not_role.splice(this.filtered_not_role.findIndex( obj => obj.id === value), 1)
  }

  closePan()
  {
    this.selected_one = null

    this.open_form = false
  }

  createNew()
  {
    this.create_new = !this.create_new

    if(!this.create_new){
      return
    }

    this.create_new_filtered_role = []

    this.create_new_filtered_not_role = this.roles.filter( obj => true)
  }

  addNewRole(item: any)
  {
    let value = item.selected.value

    if(value == undefined || value == null) return;

    let index = this.roles.findIndex( obj => obj.id === value)

    this.create_new_filtered_role.push(this.roles[index])

    this.create_new_filtered_not_role.splice(this.create_new_filtered_not_role.findIndex( obj => obj.id === value), 1)
  }

  deleteNewRole(i: number)
  {
    this.create_new_filtered_not_role.push(this.create_new_filtered_role[i])
    this.create_new_filtered_role.splice(i, 1)
  }

  updateMenu(f: NgForm)
  {
    let rq2 = this.adminRequest.postMenu({
      id: f.value.id,
      name: f.value.name,
      url: f.value.url,
      roles: this.filtered_role,
      tooltip: f.value.tooltip,
      weight: f.value.weight,
      parent: f.value.parent
    }).subscribe(response => {
      this.afterChange()
    })

    this.subs.add(rq2)
  }

  createMenu(f: NgForm)
  {
    let rq3 = this.adminRequest.putMenu({
      name: f.value.name,
      url: f.value.url,
      roles: this.create_new_filtered_role,
      tooltip: f.value.tooltip,
      weight: f.value.weight,
      parent: f.value.parent
    }).subscribe(response => {
      this.afterChange()
    })

    this.subs.add(rq3)
  }

  deleteMenu(id: number)
  {
    let rq4 = this.adminRequest.deleteMenu(id).subscribe(response => {
      this.afterChange()
    })

    this.subs.add(rq4)
  }

  afterChange()
  {
    this.selected_one = null

    this.open_form = false

    this.menus = null

    this.create_new = false

    let rq1 = this.adminRequest.getMenus().subscribe( response => {
      this.menus = response.menus
      this.roles = response.roles
    })

    this.subs.add(rq1)
  }

}
