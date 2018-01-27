import { Component, OnInit } from '@angular/core';
import { NgForm }            from '@angular/forms';

import { AdminRequestService }  from '../../../request-services/admin-request.service'

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.sass']
})
export class LanguagesComponent implements OnInit {

  languages: any

  edit_language: any

  subs = new Subscription()

  default_language: any = {
    id: null,
    name: null,
    slug: null
  }

  constructor(
    private adminRequest: AdminRequestService
  ) { }

  ngOnInit() {
    let rq1 = this.adminRequest.getLanguages().subscribe( response => this.languages = response)

    this.subs.add(rq1)
  }

  ngOnDestroy()
  {
    this.subs.unsubscribe()
  }

  submitForm(f: NgForm)
  {
    const language = {
            id: f.value.id,
            name: f.value.name,
            slug: f.value.slug
          }

    let rq1;

    if(language.id)
      rq1 = this.adminRequest.postLanguage(language).subscribe(response => this.refreshComponent())
    else
      rq1 = this.adminRequest.putLanguage(language).subscribe(response => this.refreshComponent())

    this.subs.add(rq1)
  }

  delete(id: number)
  {
    let rq4 = this.adminRequest.deleteLanguage(id).subscribe(response => this.refreshComponent())

    this.subs.add(rq4)
  }

  refreshComponent()
  {
    this.languages = null

    this.edit_language = null

    let rq1 = this.adminRequest.getLanguages().subscribe( response => this.languages = response)

    this.subs.add(rq1)
  }

  selectLanguage(language: any)
  {
    this.edit_language = language;
  }
}
