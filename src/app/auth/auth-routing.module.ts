import { NgModule } from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login",/* canActivate: [GuestRouteGuard],*/ component: LoginComponent },
  { path: "register",/* canActivate: [GuestRouteGuard],*/ component: RegisterComponent },
  { path: "logout", component: LogoutComponent }
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
export class AuthRoutingModule { }
