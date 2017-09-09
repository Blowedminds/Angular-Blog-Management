import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ArticleRequestService }  from '../../../request-services/article-request.service'

declare var swal: any;

@Component({
  selector: 'app-manage-permission',
  templateUrl: './manage-permission.component.html',
  styleUrls: ['./manage-permission.component.sass']
})
export class ManagePermissionComponent implements OnInit {

  data: any

  have_permission: any

  not_have_permission: any

  change_have_permission: Array<any> = []

  change_not_have_permission: Array<any> = []

  constructor(
    private articleRequest: ArticleRequestService,
    @Inject(MD_DIALOG_DATA) private dialog_data: any,
    private dialogRef: MdDialogRef<ManagePermissionComponent>,
  ) { }

  ngOnInit() {
    this.articleRequest.getPermission(this.dialog_data.id).subscribe(response => {

      this.have_permission = response.users.filter( obj => {
        for( let one of response.permission){
          if(obj.user_id === one.user_id) return true
        }
        return false
      })

      for(let one of response.permission){
        let index = response.users.findIndex( obj => obj.user_id === one.user_id)

        if(index != -1) response.users.splice(index, 1)
      }

      this.not_have_permission = response.users
    })
  }

  addUser(i: number)
  {
    let item = this.not_have_permission[i]

    if(!item.key){
      item.key = true

      this.change_have_permission.push(item)
    }else{
      delete this.not_have_permission[i].key

      let index = this.change_not_have_permission.findIndex( obj => obj.user_id === item.user_id)

      this.change_not_have_permission.splice(index, 1)
    }

    this.have_permission.push(item)

    this.not_have_permission.splice(i, 1)
  }

  discardUser(i: number)
  {
    let item = this.have_permission[i]

    if(!item.key){

      item.key = true

      this.change_not_have_permission.push(item)
    }else{
      delete this.have_permission[i].key

      let index = this.change_not_have_permission.findIndex( obj => obj.user_id === item.user_id)

      this.change_have_permission.splice(index, 1)
    }

    this.not_have_permission.push(this.have_permission[i])

    this.have_permission.splice(i, 1)
  }

  consoleLog()
  {
    console.log(this.change_have_permission, this.change_not_have_permission)
  }

  updatePermission()
  {
    if(this.change_have_permission.length == 0 && this.change_not_have_permission.length == 0 ){
      swal('Bilgi', 'Değişiklik algılanmadı', 'info')

      this.dialogRef.close()
      return
    }

    this.articleRequest.putPermission(this.dialog_data.id, this.change_have_permission, this.change_not_have_permission).subscribe(response => {
      this.dialogRef.close()

      swal(response.header, response.message, response.state)
    })
  }

}
