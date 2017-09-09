import { Component, OnInit, Inject} from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms'

import { ArticleRequestService }  from '../../../request-services/article-request.service'
import { ImageRequestService }  from '../../../request-services/image-request.service'
import { ApiService } from '../../../api.service'

import { ImageSelectComponent } from '../../albums/image-select/image-select.component'
import { ManagePermissionComponent } from '../manage-permission/manage-permission.component'

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.sass']
})
export class EditArticleComponent implements OnInit {
  article_data: any;

  categories: any;

  properties: any;

  add_categories: any;

  image_name: string

  API_URL: any

  THUMB_URL: string

  user: any

  constructor(
    private dialogRef: MdDialogRef<EditArticleComponent>,
    @Inject(MD_DIALOG_DATA) private data: any,
    private article: ArticleRequestService,
    public dialog: MdDialog,
    private imageRequest: ImageRequestService,
    private api: ApiService
  )
  {
    this.article_data = data.data

    this.image_name = data.data.image

    this.categories = data.data.categories

    this.user = data.user

    this.properties = data.properties

    this.add_categories = data.properties.categories

    this.API_URL = this.imageRequest.API_URL

    this.THUMB_URL = this.imageRequest.THUMB_URL
  }

  ngOnInit() {
    for(let one of this.categories)
      this.add_categories = this.add_categories.filter( obj => obj.id !== one.id)
  }

  getToken()
  {
    return this.api.getToken()
  }

  addCategory(item: any)
  {
    if(item.selected.value == undefined || item.selected.value == null) return;

    let index = this.add_categories.findIndex( obj => obj.id === item.selected.value)

    this.categories.push(this.add_categories[index])

    this.add_categories.splice(index, 1)
  }

  deleteCategory(item: any)
  {
    this.add_categories.push(this.categories[item])
    this.categories.splice(item, 1)
  }

  editArticle(f: NgForm)
  {
    let categories = []

    for(let one of this.categories)
      categories.push(one.id)

    this.article.putArticle({
      id: this.article_data.id,
      slug: f.value.slug,
      categories: categories,
      image: this.image_name
    }).subscribe(response => {

      this.dialogRef.close(response.message);
    })
  }

  deleteArticle()
  {
    this.article.deleteArticle(this.article_data.id).subscribe(response => {

      this.dialogRef.close(response.message);

      //swal(response.header, response.message, response.state)
    } )
  }

  openImageSelect()
  {
    let dialogRef = this.dialog.open(ImageSelectComponent)

    dialogRef.afterClosed().subscribe( response => {

      let test = document.getElementById('img')

      test.setAttribute('src', response.thumb_url)

      this.image_name = response.u_id
    })
  }

  openManagePermission()
  {
    let dialogRef = this.dialog.open(ManagePermissionComponent, {
      data: {
        id: this.article_data.id,
      }
    })

    dialogRef.afterClosed().subscribe( response => {

    })
  }

}
