import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms'

import { ImageRequestService }  from '../../../request-services/image-request.service'

import { ApiService } from '../../../api.service'

import { SaveAsComponent } from '../../../dialogs/albums/save-as/save-as.component'

declare var Cropper: any;

declare var swal: any;

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.sass']
})
export class ImageEditComponent implements OnInit {

  image: any;

  u_id: any;

  API_URL: string;

  IMAGE_URL: string

  cropper: any

  cropperInitialized: boolean = false

  cropperData: any = {x: null, y: null, width: null, height: null, rotate: null}

  constructor(
    private route: ActivatedRoute,
    private imageRequest: ImageRequestService,
    private api: ApiService,
    public dialog: MatDialog,
  ) {
    this.API_URL = this.imageRequest.API_URL

    this.IMAGE_URL = this.imageRequest.IMAGE_URL
   }

  ngOnInit() {
    this.route.params.switchMap( (params: Params) => {



      return this.imageRequest.getEdit(params['image'])}).subscribe(response => {
        this.u_id = response.u_id
        this.image = response
      })
  }

  getToken()
  {
    return this.api.getToken()
  }

  initialCropper(id: string)
  {
    if(this.cropper){
      this.cropper.destroy()
      this.cropper = null
      this.cropperInitialized = false
      return
    }

    let element = document.getElementById(id)

    this.cropper = new Cropper(element, {
      scalable: false,
      zoomable: false,
      ready: () => this.cropperInitialized = true,
      crop: (e: any) => {
        this.cropperData.x = parseInt(e.detail.x)
        this.cropperData.y = parseInt(e.detail.y)
        this.cropperData.width = parseInt(e.detail.width)
        this.cropperData.height = parseInt(e.detail.height)
        this.cropperData.rotate = parseInt(e.detail.rotate)
      }
    })
  }

  setData(f: NgForm)
  {
    this.cropper.setData({
      x: parseInt(f.value.x),
      y: parseInt(f.value.y),
      width: parseInt(f.value.width),
      height: parseInt(f.value.height),
      rotate: parseInt(f.value.rotate),
    })
  }

  consoleLog()
  {
    console.log(this.cropper.getData())
  }

  saveAndUpdateImage(f: NgForm, save: boolean)
  {
    let data = {}

    let _public = f.value.public ? 1 : 0

    let save_as = (save) ? 1 : 0

    if(this.cropper){
      let cropper = this.cropper.getData()

      data = {
        u_id: this.u_id,
        name: f.value.name,
        alt: f.value.alt,
        save_as: save_as,
        crop: 1,
        public: _public,
        width: parseInt(cropper.width),
        height: parseInt(cropper.height),
        x: parseInt(cropper.x),
        y: parseInt(cropper.y),
        rotate: parseInt(cropper.rotate)
      }
    }else{
      data = {
        u_id: this.u_id,
        name: f.value.name,
        alt: f.value.alt,
        save_as: save_as,
        crop: 0,
        public: _public
      }
    }

    let rq1 = this.imageRequest.putEdit(data).subscribe(response => {
      swal(response.header, response.message, response.state)
      rq1.unsubscribe()
      rq1 = null
    })
  }

  deleteImage()
  {
    let rq2 = this.imageRequest.deleteImage(this.u_id).subscribe(response => {

      swal(response.header, response.message, response.state)

      this.api.navigate(['/management/albums'])

      rq2.unsubscribe()
      rq2 = null
    })
  }

  calcSize(size: number)
  {
    let size_2 = (''+(size/1024))

    return parseInt(size_2);
  }

  openSaveAs()
  {
    let dialogRef = this.dialog.open(SaveAsComponent, {
      disableClose: true
    })

    let rq3 = dialogRef.afterClosed().subscribe( result => {
      if(!result) return

      this.saveAndUpdateImage(result, true)

      rq3.unsubscribe()
      rq3 = null
    })
  }
}
