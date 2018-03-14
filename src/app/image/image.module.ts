import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './components/images/images.component';
import { ImageEditComponent } from './components/image-edit/image-edit.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImagesComponent, ImageEditComponent]
})
export class ImageModule { }
