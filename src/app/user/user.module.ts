import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { NavigationComponent } from './components/navigation/navigation.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { UserRequestService } from './services/user-request.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    NavigationComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    UserRoutingModule
  ],
  providers: [
    UserRequestService,
    UserService
  ]
})
export class UserModule { }
