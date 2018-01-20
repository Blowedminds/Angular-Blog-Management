import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { ArticleRequestService }  from '../../request-services/article-request.service'
import { UserRequestService }  from '../../request-services/user-request.service'
import { UserService }  from '../../system-services/user/user.service'
import { GlobalDataService }  from '../../system-services/global-data/global-data.service'

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

  properties: any = { languages: "", categories: ""};

  user_info: any;

  subscriptions = new Subscription()

  pageSizeOptions: Array<number> = [5, 10, 20, 50]


  constructor(
    public dialog: MatDialog,
    private article: ArticleRequestService,
    private admin: UserRequestService,
    private globalDataService: GlobalDataService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {

    this.getArticlesPaginate({
      length: null,
      pageSize: this.pageSizeOptions[0],
      pageIndex: 0
    })

    this.subscriptions.add(this.globalDataService.languages.subscribe(response => this.properties.languages = response || null))

    this.subscriptions.add(this.globalDataService.categories.subscribe(response => this.properties.categories = response || null))

    this.subscriptions.add(this.userService.userObs.subscribe( user => this.user_info = user))

  }

  ngOnDestroy()
  {
    this.subscriptions.unsubscribe()
  }

  getArticlesPaginate(props: any)
  {
    this.articles = null

     let rq1 = this.article.getArticlesPaginate({
        pageSize: props.pageSize, pageIndex: props.pageIndex + 1
      }).subscribe(response => this.articles = response)

     this.subscriptions.add(rq1);
  }

  intval(value: string)
  {
    return +value;
  }

  findLanguage(id: number)
  {
    let lang = this.properties.languages.find( obj => obj.id === id)

    return lang ? lang.name : "NullLanguage";
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

      let rq7 = this.article.getArticles().subscribe(response => {
        this.articles = response
        rq7.unsubscribe()
      })

      rq1.unsubscribe()
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
      })

      rq2.unsubscribe()
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
      })

      rq3.unsubscribe()
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
    })
  }
}
