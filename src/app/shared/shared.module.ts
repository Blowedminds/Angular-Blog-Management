import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';

import { ImageSelectComponent } from './dialogs/images/image-select/image-select.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { SidebarComponent } from './components/main-navigation/sidebar/sidebar.component';
import { HeaderComponent } from './components/main-navigation/header/header.component';

import { UrlPipe } from './pipes/url.pipe';
import { EnvironmentUrlPipe } from './pipes/environment-url.pipe';
import { DropdownMenuComponent } from './components/main-navigation/sidebar/dropdown-menu/dropdown-menu.component';

@NgModule({
  declarations: [
    ImageSelectComponent,
    HeaderComponent,
    SidebarComponent,
    MainNavigationComponent,
    UrlPipe,
    EnvironmentUrlPipe,
    DropdownMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    HeaderComponent,
    SidebarComponent,
    UrlPipe,
    EnvironmentUrlPipe
  ],
  entryComponents: [
    ImageSelectComponent
  ]
})
export class SharedModule { }
