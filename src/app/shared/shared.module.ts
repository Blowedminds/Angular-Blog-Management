import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';

import { ImageSelectComponent } from './dialogs/images/image-select/image-select.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';

@NgModule({
  declarations: [
    ImageSelectComponent,
    MainNavigationComponent
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
    FormsModule
  ],
  entryComponents: [
    ImageSelectComponent
  ]
})
export class SharedModule { }
