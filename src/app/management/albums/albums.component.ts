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

    let rq1 = this.imageRequest.getImages().subscribe(response => {
      this.images = response
      rq1.unsubscribe()
      rq1 = null
    })
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

    let rq2 = dialogRef.afterClosed().subscribe( result => {
      if(!result) return

      this.images = null

      let rq3 = this.imageRequest.getImages().subscribe(response => {
        this.images = response
        rq3.unsubscribe()
        rq3 = null
      })

      rq2.unsubscribe()
      rq2 = null
    })
  }

}
