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

  edit_category: any

  subs = new Subscription()

  default_category: any = {
    id: null,
    name: null,
    slug: null,
    description: null
  }

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

  submitForm(f: NgForm)
  {
    const category = {
            id: f.value.id,
            name: f.value.name,
            slug: f.value.slug,
            description: f.value.description,
          }

    let rq1;

    if(category.id)
      rq1 = this.adminRequest.postCategory(category).subscribe(response => this.refreshComponent())
    else
      rq1 = this.adminRequest.putCategory(category).subscribe(response => this.refreshComponent())

    this.subs.add(rq1)
  }

  delete(id: number)
  {
    let rq4 = this.adminRequest.deleteCategory(id).subscribe(response => this.refreshComponent())

    this.subs.add(rq4)
  }

  refreshComponent()
  {
    this.categories = null

    this.edit_category = null

    let rq1 = this.adminRequest.getCategories().subscribe( response => this.categories = response)

    this.subs.add(rq1)
  }

  selectCategory(category: any)
  {
    this.edit_category = category;
  }
}
