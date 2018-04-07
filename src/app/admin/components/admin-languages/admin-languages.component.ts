import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AdminRequestService } from '../../services/admin-request.service';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.sass']
})
export class AdminLanguagesComponent implements OnInit, OnDestroy {

  languages: any;

  edit_language: any;

  subs = new Subscription();

  default_language: any = {
    id: null,
    name: null,
    slug: null
  };

  get isPageReady() {
    return !!this.languages;
  }

  constructor(
    private adminRequestService: AdminRequestService
  ) { }

  ngOnInit() {
    const rq1 = this.adminRequestService.getLanguages().subscribe(response => this.languages = response);

    this.subs.add(rq1);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  submitForm(f: NgForm) {
    const language = {
      id: f.value.id,
      name: f.value.name,
      slug: f.value.slug
    };

    let rq1;

    if (language.id) {

      rq1 = this.adminRequestService.postLanguage(language).subscribe(response => this.refreshComponent());
    }
    else {

      rq1 = this.adminRequestService.putLanguage(language).subscribe(response => this.refreshComponent());
    }

    this.subs.add(rq1);
  }

  delete(id: number) {
    const rq4 = this.adminRequestService.deleteLanguage(id).subscribe(response => this.refreshComponent());

    this.subs.add(rq4);
  }

  refreshComponent() {
    this.languages = null;

    this.edit_language = null;

    const rq1 = this.adminRequestService.getLanguages().subscribe(response => this.languages = response);

    this.subs.add(rq1);
  }

  selectLanguage(language: any) {
    this.edit_language = language;
  }
}
