import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { ImageRequestService }  from '../../../request-services/image-request.service'
import { ApiService } from '../../../api.service'

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.sass']
})
export class ImageSelectComponent implements OnInit {

  images: any

  API_URL: string;

  THUMB_URL: string

  IMAGE_URL: string

  constructor(
    private api: ApiService,
    private imageRequest: ImageRequestService,
    private dialogRef: MdDialogRef<ImageSelectComponent>,
  ) {
    this.API_URL = this.imageRequest.API_URL

    this.IMAGE_URL = this.imageRequest.IMAGE_URL

    this.THUMB_URL = this.imageRequest.THUMB_URL
  }

  ngOnInit() {
    this.imageRequest.getImages().subscribe(response => this.images = response)
  }

  getToken()
  {
    return this.api.getToken()
  }

  selectImage(u_id: string)
  {
    this.dialogRef.close({thumb_url:this.API_URL + this.THUMB_URL + u_id +'?token=' + this.getToken(), u_id: u_id, image_url: this.API_URL + this.IMAGE_URL + u_id +'?token=' + this.getToken()});
  }
}
