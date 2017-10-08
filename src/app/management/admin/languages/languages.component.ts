import { Component, OnInit } from '@angular/core';
import { NgForm }            from '@angular/forms';

import { AdminRequestService }  from '../../../request-services/admin-request.service'

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  languages: any

  selected_one: any

  open_form: boolean = false

  create_new: boolean = false

  subs = new Subscription()

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

  selectPan(i: number)
  {
    if(this.selected_one)
      if(this.selected_one.id === this.languages[i].id){

        this.closePan()

        return
      }

    this.open_form = true

    this.selected_one = this.languages[i]
  }

  closePan()
  {
    this.selected_one = null

    this.open_form = false
  }

  updateLanguage(f: NgForm)
  {
    let rq2 = this.adminRequest.postLanguage({id: f.value.id, name: f.value.name, slug: f.value.slug}).subscribe(response => {
      this.afterChange()
    })

    this.subs.add(rq2)
  }

  createLanguage(f: NgForm)
  {
    let rq3 = this.adminRequest.putLanguage({name: f.value.name, slug: f.value.slug}).subscribe(response => {
      this.afterChange()
    })

    this.subs.add(rq3)
  }

  deleteLanguage(id: number)
  {
      let rq4 = this.adminRequest.deleteLanguage(id).subscribe(response => {
        this.afterChange()
      })

      this.subs.add(rq4)
  }

  afterChange()
  {
    this.selected_one = null

    this.open_form = false

    this.languages = null

    this.create_new = false

    let rq1 = this.adminRequest.getLanguages().subscribe( response => this.languages = response)

    this.subs.add(rq1)
  }

}
