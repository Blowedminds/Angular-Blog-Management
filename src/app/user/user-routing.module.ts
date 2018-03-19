import { NgModule } from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { NavigationComponent } from './components/navigation/navigation.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes = [
  { path: "", component: NavigationComponent, children: [
      { path: "profile", component: UserProfileComponent }
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
export class UserRoutingModule { }
