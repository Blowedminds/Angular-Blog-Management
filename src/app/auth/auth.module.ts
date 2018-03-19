import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';

import { AuthRequestService } from './services/auth-request.service';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    CoreModule,
    MaterialModule,
    SharedModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  providers: [
    AuthRequestService,
    AuthService
  ]
})
export class AuthModule { }
