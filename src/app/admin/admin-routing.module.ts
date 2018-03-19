import { NgModule } from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminMenusComponent } from './components/admin-menus/admin-menus.component';
import { AdminLanguagesComponent } from './components/admin-languages/admin-languages.component';
import { AdminCategoriesComponent } from './components/admin-categories/admin-categories.component';
import { NavigationComponent } from './components/navigation/navigation.component';

const routes = [
  { path: "", component: NavigationComponent, children: [
      { path: "admin", component: AdminPanelComponent, children: [
          { path: "menus", component: AdminMenusComponent, outlet: "settings"},
          { path: "languages", component: AdminLanguagesComponent, outlet: "settings"},
          { path: "categories", component: AdminCategoriesComponent, outlet: "settings"},
        ]
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      { enableTracing: false}
  )],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
