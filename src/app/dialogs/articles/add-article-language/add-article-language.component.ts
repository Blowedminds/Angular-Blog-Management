import { Component, OnInit, Inject, OnDestroy, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms'

import { ArticleRequestService }  from '../../../request-services/article-request.service'

declare var swal: any

declare var tinymce: any

@Component({
  selector: 'app-add-article-language',
  templateUrl: './add-article-language.component.html',
  styleUrls: ['./add-article-language.component.sass']
})
export class AddArticleLanguageComponent implements OnInit, AfterViewInit, OnDestroy {

    properties: any;

    id: any;

    @Input() elementId: string = "tinymce-textarea";

    @Output() onEditorKeyup = new EventEmitter<any>();

    editor: any

    constructor(
      public dialogRef: MdDialogRef<AddArticleLanguageComponent>,
      @Inject(MD_DIALOG_DATA) private data: any,
      private article: ArticleRequestService
    )
    {
        let item = data.properties.languages
        for(let i = 0; i < data.data.contents.length; i++){

          item = item.filter( (obj) => obj.id !== data.data.contents[i].language)
        }

        this.properties = item

        this.id = data.data.id
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
      tinymce.init({
        selector: '#' + this.elementId,
        plugins: ['link', 'paste', 'table'],
        skin_url: '/assets/skins/lightgray',
        setup: editor => {

          this.editor = editor;

          editor.on('keyup', () => {

            const content = editor.getContent();
            this.onEditorKeyup.emit(content);
          });
        },
      });
    }

    ngOnDestroy() {
      tinymce.remove(this.editor);
    }


    addLanguageArticle(f: NgForm)
    {
      this.article.postContent({
        id: this.id,
        title: f.value.title,
        sub_title: f.value.sub_title,
        body: tinymce.activeEditor.getContent(),
        keywords: f.value.keywords,
        published: f.value.published ? 1 : 0,
        language: f.value.language
      }).subscribe( (response) => {

        this.dialogRef.close(response.message);

        //swal(response.header, response.message, response.state)
      })
    }
  }
