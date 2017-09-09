import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { ArticleRequestService }  from '../../request-services/article-request.service'
import { AdminRequestService }  from '../../request-services/admin-request.service'
import { UserService }  from '../../system-services/user.service'

import { AddArticleComponent } from '../../dialogs/articles/add-article/add-article.component'
import { AddArticleLanguageComponent } from '../../dialogs/articles/add-article-language/add-article-language.component'
import { EditArticleComponent } from '../../dialogs/articles/edit-article/edit-article.component'
import { EditArticleLanguageComponent } from '../../dialogs/articles/edit-article-language/edit-article-language.component'

declare var swal: any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit {

  articles: any;

  properties: any;

  user_info: any;

  subscriptions = new Subscription()

  constructor(
    public dialog: MdDialog,
    private article: ArticleRequestService,
    private admin: AdminRequestService,
    private userService: UserService,
    private snackBar: MdSnackBar
  ) {
  }

  ngOnInit() {

    /*let sub1 = this.article.getArticles().subscribe(response => this.articles = response)

    let sub2 = this.article.getProperties().subscribe(response => this.properties = response)

    let sub3 = this.user.userObs.subscribe( user => this.user_info = user)*/
    this.subscriptions.add(this.article.getArticles().subscribe(response => this.articles = response))

    this.subscriptions.add(this.article.getProperties().subscribe(response => this.properties = response))

    this.subscriptions.add(this.userService.userObs.subscribe( user => this.user_info = user))

  }

  ngOnDestroy()
  {
    this.subscriptions.unsubscribe()
  }

  openDialog()
  {
    let dialogRef = this.dialog.open(AddArticleComponent, {
      disableClose: true,
      data: {
        properties: this.properties
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return

      this.snackBar.open(result, 'Tamam',{
        duration: 1500,
      })

      this.articles = null
      this.properties = null

      this.article.getArticles().subscribe(response => this.articles = response)

      this.article.getProperties().subscribe(response => this.properties = response)
    })
  }

  openEditDialog(article_content: any)
  {
    let dialogRef = this.dialog.open(EditArticleLanguageComponent, {
      disableClose: true,
      data: {
        properties: this.properties,
        data: article_content,
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return

      this.snackBar.open(result, 'Tamam',{
        duration: 1500,
      })

      this.articles = null

      this.article.getArticles().subscribe(response => this.articles = response)
    })
  }

  openEditMainDialog(i: number)
  {
    let dialogRef = this.dialog.open(EditArticleComponent, {
      disableClose: true,
      data: {
        data: this.articles.data[i],
        properties: this.properties,
        user: this.user_info
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return

      this.snackBar.open(result, 'Tamam',{
        duration: 1500,
      })

      this.articles = null

      this.article.getArticles().subscribe(response => this.articles = response)
    })
  }

  openAddLanguage(i: number)
  {
    let dialogRef = this.dialog.open(AddArticleLanguageComponent, {
      disableClose: true,
      data: {
        properties: this.properties,
        data: this.articles.data[i]
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return

      this.snackBar.open(result, 'Tamam',{
        duration: 1500,
      })

      this.articles = null

      this.article.getArticles().subscribe(response => this.articles = response)
    })
  }
}
