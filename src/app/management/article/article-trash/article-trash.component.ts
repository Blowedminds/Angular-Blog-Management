import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ArticleRequestService }  from '../../../request-services/article-request.service'

declare var swal: any;

@Component({
  selector: 'app-article-trash',
  templateUrl: './article-trash.component.html',
  styleUrls: ['./article-trash.component.sass']
})
export class ArticleTrashComponent implements OnInit {


  data: any

  displayedColumns: Array<string> = ['Author', 'Title', 'Deleted_At', 'ArticleId']

  constructor(
    private article: ArticleRequestService
  ) { }

  dataBase: any =  new DataBase(this.article)

  ngOnInit() {

    this.data = new DataSourceCode(this.dataBase)
  }

  restoreArticle(article_id: number)
  {
    swal({
      title: 'Emin misiniz?',
      text: "Bu makaleyi geri yükleyeceksiniz",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: "Hayır",
      confirmButtonText: 'Evet, Geri Döndür'
    }).then( () => {
      this.article.postRestore(article_id).subscribe(response => {

        let test = new DataBase(this.article)

        this.data = new DataSourceCode(test)

        swal(response.header, response.message, response.state)
      })
    })
  }

  forceDeleteArticle(article_id: number)
  {
    swal({
      title: 'Emin misiniz?',
      text: "Bu makale kayıtlardan tamamen silinecek",
      type: 'warning',
      input: 'checkbox',
      inputPlaceholder: ' Eski kayıtlarla bearber sil',
      showCancelButton: true,
      cancelButtonText: "Hayır",
      confirmButtonText: 'Tamamen Sil'
    }).then( (response) => {

      let complete = (response) ? 1 : 0

      this.article.postForceDelete(article_id, complete).subscribe(response => {

        let test = new DataBase(this.article)

        this.data = new DataSourceCode(test)

        swal(response.header, response.message, response.state)
      })
    })
  }

}

export class ArticleData {

  author: string;
  deleted_at: string;
  title: string;
  article_id: string;
}

export class DataBase {

  dataChange: BehaviorSubject<ArticleData[]> = new BehaviorSubject<ArticleData[]>([])

  get data(): ArticleData[] { return this.dataChange.value; }

  constructor(private article: ArticleRequestService) {

    this.article.getTrash().subscribe(response => {
      for(let one of response.data)
        this.addContent(one)

    })
  }

  addContent(content: any)
  {
    const copiedData = this.data.slice()
    copiedData.push(content)
    this.dataChange.next(copiedData)
  }
}

export class DataSourceCode extends DataSource<any> {

  constructor(private _dataBase: DataBase){
    super();
  }

  connect(): Observable<any>
  {
    return this._dataBase.dataChange
  }

  disconnect() {}
}
