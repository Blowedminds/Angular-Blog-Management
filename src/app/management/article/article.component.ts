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

    let rq1 = dialogRef.afterClosed().subscribe(result => {
      if(!result) return

      this.snackBar.open(result, 'Tamam',{
        duration: 1500,
      })

      this.articles = null
      this.properties = null

      let rq7 = this.article.getArticles().subscribe(response => {
        this.articles = response
        rq7.unsubscribe()
        rq7 = null
      })

      let rq8 = this.article.getProperties().subscribe(response => {
        this.properties = response
        rq8.unsubscribe()
        rq8 = null
      })

      rq1.unsubscribe()
      rq1 = null
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

    let rq2 = dialogRef.afterClosed().subscribe(result => {
      if(!result) return

      this.snackBar.open(result, 'Tamam',{
        duration: 1500,
      })

      this.articles = null

      let rq6 = this.article.getArticles().subscribe(response => {
        this.articles = response
        rq6.unsubscribe()
        rq6 = null
      })

      rq2.unsubscribe()
      rq2 = null
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

    let rq3 = dialogRef.afterClosed().subscribe(result => {
      if(!result) return

      this.snackBar.open(result, 'Tamam',{
        duration: 1500,
      })

      this.articles = null

      let rq5 = this.article.getArticles().subscribe(response => {
        this.articles = response
        rq5.unsubscribe()
        rq5 = null
      })

      rq3.unsubscribe()
      rq3 = null
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

    let rq4 = dialogRef.afterClosed().subscribe(result => {
      if(!result) return

      this.snackBar.open(result, 'Tamam',{
        duration: 1500,
      })

      this.articles = null

      this.article.getArticles().subscribe(response => this.articles = response)

      rq4.unsubscribe()
      rq4 = null
    })
  }
}
