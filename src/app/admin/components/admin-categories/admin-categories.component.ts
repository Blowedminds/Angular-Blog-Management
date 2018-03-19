import { Component, OnInit } from '@angular/core';
import { NgForm }            from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { AdminRequestService } from '../../services/admin-request.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.sass']
})
export class AdminCategoriesComponent implements OnInit {

  categories: any

  edit_category: any

  subs = new Subscription()

  default_category: any = {
    id: null,
    name: null,
    slug: null,
    description: null
  }

  get isPageReady()
  {
    return this.categories;
  }

  constructor(
    private AdminRequestService: AdminRequestService
  ) { }

  ngOnInit() {
    let rq1 = this.AdminRequestService.getCategories().subscribe( response => this.categories = response)

    this.subs.add(rq1)
  }

  ngOnDestroy()
  {
    this.subs.unsubscribe()
  }

  submitForm(f: NgForm)
  {
    const category = {
            name: f.value.name,
            slug: f.value.slug,
            description: f.value.description,
          }

    let rq1;

    if(f.value.id)
      rq1 = this.AdminRequestService.postCategory(category, f.value.id).subscribe(response => this.refreshComponent())
    else
      rq1 = this.AdminRequestService.putCategory(category).subscribe(response => this.refreshComponent())

    this.subs.add(rq1)
  }

  delete(id: number)
  {
    let rq4 = this.AdminRequestService.deleteCategory(id).subscribe(response => this.refreshComponent())

    this.subs.add(rq4)
  }

  refreshComponent()
  {
    this.categories = null

    this.edit_category = null

    let rq1 = this.AdminRequestService.getCategories().subscribe( response => this.categories = response)

    this.subs.add(rq1)
  }

  selectCategory(category: any)
  {
    this.edit_category = category;
  }
}
