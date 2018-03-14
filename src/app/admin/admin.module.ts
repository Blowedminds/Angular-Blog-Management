import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminCategoriesComponent } from './components/admin-categories/admin-categories.component';
import { AdminLangugagesComponent } from './components/admin-langugages/admin-langugages.component';
import { AdminMenusComponent } from './components/admin-menus/admin-menus.component';

import { AdminRequestService } from './services/admin-request.service';
import { AdminService } from './services/admin.service';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminCategoriesComponent,
    AdminLangugagesComponent,
    AdminMenusComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
    CoreModule
  ],
  providers: [
    AdminRequestService,
    AdminService
  ]
})
export class AdminModule { }
