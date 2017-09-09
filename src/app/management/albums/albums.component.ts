import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms'

import { AdminRequestService }  from '../../request-services/admin-request.service'
import { ImageRequestService }  from '../../request-services/image-request.service'

import { ImageAddComponent }  from '../../dialogs/albums/image-add/image-add.component'

import { ApiService } from '../../api.service'

 @Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.sass']
})
export class AlbumsComponent implements OnInit {

  images: any

  API_URL: string;

  THUMB_URL: string;

  constructor(
    private imageRequest: ImageRequestService,
    private adminRequest: AdminRequestService,
    public dialog: MdDialog,
    private api: ApiService
  ) {
    this.API_URL = this.imageRequest.API_URL

    this.THUMB_URL = this.imageRequest.THUMB_URL
   }

  ngOnInit() {

    this.imageRequest.getImages().subscribe(response => this.images = response)
  }

  getToken()
  {
    return this.api.getToken()
  }

  openImageUploader()
  {
    let dialogRef = this.dialog.open(ImageAddComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe( result => {
      if(!result) return

      this.images = null

      this.imageRequest.getImages().subscribe(response => this.images = response)
    })
  }

}
