import { Component, OnInit } from '@angular/core';
import { NgForm }            from '@angular/forms';

import { AdminRequestService }  from '../../../request-services/admin-request.service'

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  categories: any

  selected_one: any

  open_form: boolean = false

  create_new: boolean = false

  subs = new Subscription()

  constructor(
    private adminRequest: AdminRequestService
  ) { }

  ngOnInit() {
    let rq1 = this.adminRequest.getCategories().subscribe( response => this.categories = response)

    this.subs.add(rq1)
  }

  ngOnDestroy()
  {
    this.subs.unsubscribe()
  }

  selectPan(i: number)
  {
    if(this.selected_one)
      if(this.selected_one.id === this.categories[i].id){

        this.closePan()

        return
      }

    this.open_form = true

    this.selected_one = this.categories[i]
  }

  closePan()
  {
    this.selected_one = null

    this.open_form = false
  }

  updateCategory(f: NgForm)
  {
    let rq2 = this.adminRequest.postCategory({
      id: f.value.id,
      name: f.value.name,
      description: f.value.description,
      slug:f.value.slug
    }).subscribe(response => {
      this.afterChange()
    })

    this.subs.add(rq2)
  }

  createCategory(f: NgForm)
  {
    let rq3 = this.adminRequest.putCategory({
      name: f.value.name,
      description: f.value.description,
      slug: f.value.slug
    }).subscribe(response => {
      this.afterChange()
    })

    this.subs.add(rq3)
  }

  deleteCategory(id: number)
  {
    let rq4 = this.adminRequest.deleteCategory(id).subscribe(response => {
      this.afterChange()
    })

    this.subs.add(rq4)
  }

  afterChange()
  {
    this.selected_one = null

    this.open_form = false

    this.categories = null

    this.create_new = false

    let rq1 = this.adminRequest.getCategories().subscribe( response => this.categories = response)

    this.subs.add(rq1)
  }

}
