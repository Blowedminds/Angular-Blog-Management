import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../api.service'

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.sass']
})
export class RedirectComponent implements OnInit {

  constructor(
    private api: ApiService
  ) {
    //api.localeObs.subscribe( locale => api.navigate([locale]))
  }

  ngOnInit() {
  }

}
