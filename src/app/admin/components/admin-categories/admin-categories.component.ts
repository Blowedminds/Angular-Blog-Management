import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AdminRequestService } from '../../services/admin-request.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.sass']
})
export class AdminCategoriesComponent implements OnInit, OnDestroy {

  categories: any;

  edit_category: any;

  subs = new Subscription();

  default_category: any = {
    id: null,
    name: null,
    slug: null,
    description: null
  };

  get isPageReady() {
    return this.categories;
  }

  constructor(
    private adminRequestService: AdminRequestService
  ) { }

  ngOnInit() {
    const rq1 = this.adminRequestService.getCategories().subscribe(response => this.categories = response);

    this.subs.add(rq1);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  submitForm(f: NgForm) {
    const category = {
      name: f.value.name,
      slug: f.value.slug,
      description: f.value.description,
    };

    let rq1;

    if (f.value.id) {

      rq1 = this.adminRequestService.postCategory(category, f.value.id).subscribe(response => this.refreshComponent());
    } else {

      rq1 = this.adminRequestService.putCategory(category).subscribe(response => this.refreshComponent());
    }

    this.subs.add(rq1);
  }

  delete(id: number) {
    const rq4 = this.adminRequestService.deleteCategory(id).subscribe(response => this.refreshComponent());

    this.subs.add(rq4);
  }

  refreshComponent() {
    this.categories = null;

    this.edit_category = null;

    const rq1 = this.adminRequestService.getCategories().subscribe(response => this.categories = response);

    this.subs.add(rq1);
  }

  selectCategory(category: any) {
    this.edit_category = category;
  }
}
