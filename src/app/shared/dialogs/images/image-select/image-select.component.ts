import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.sass']
})
export class ImageSelectComponent implements OnInit {

  images: any

  THUMB_IMAGE_URL: string

  get isPageReady()
  {
    return !!this.images;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialog_data: any,
    private dialogRef: MatDialogRef<ImageSelectComponent>,
  )
  {
    this.THUMB_IMAGE_URL = dialog_data.thumb_image_url;

    dialog_data.image_request.subscribe( response => this.images = response);
  }

  ngOnInit() {
  }

  selectImage(image: any)
  {
    this.dialogRef.close({
      thumb_url: this.THUMB_IMAGE_URL + image.u_id,
      u_id: image.u_id,
      alt: image.alt,
      width: image.width,
      height: image.height
    });
  }
}
