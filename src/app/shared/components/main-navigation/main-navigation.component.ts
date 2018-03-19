import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.sass']
})
export class MainNavigationComponent implements OnInit {

  user: any;

  menus: any = [];

  constructor() { }

  ngOnInit() {
  }

  get isPageReady()
  {
    return this.menus && this.user;
  }

}
