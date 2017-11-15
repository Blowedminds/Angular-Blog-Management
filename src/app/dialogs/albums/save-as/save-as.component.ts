import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-save-as',
  templateUrl: './save-as.component.html',
  styleUrls: ['./save-as.component.sass']
})
export class SaveAsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SaveAsComponent>,
  ) { }

  ngOnInit() {
  }

  updateImage(f: NgForm)
  {
    this.dialogRef.close(f)
  }

}
