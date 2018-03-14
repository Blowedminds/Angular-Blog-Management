import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ArticleRequestService }  from '../../services/article-request.service';

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
    private articleRequestService: ArticleRequestService
  ) { }

  dataBase: any =  new DataBase(this.articleRequestService)

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
      let rq1 = this.articleRequestService.postRestore(article_id).subscribe(response => {

        let test = new DataBase(this.articleRequestService)

        this.data = new DataSourceCode(test)

        swal(response.header, response.message, response.state)

        rq1.unsubscribe()
        rq1 = null
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

      let rq2 = this.articleRequestService.deleteForceDelete(article_id).subscribe(response => {

        let test = new DataBase(this.articleRequestService)

        this.data = new DataSourceCode(test)

        swal(response.header, response.message, response.state)

        rq2.unsubscribe()
        rq2 = null
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

    let rq3 = this.article.getTrash().subscribe(response => {
      for(let one of response.data)
        this.addContent(one)
      rq3.unsubscribe()
      rq3 = null
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
