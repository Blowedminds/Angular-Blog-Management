import { Component, OnInit, Inject, OnDestroy, AfterViewInit, EventEmitter, Input, Output  } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms'

import { ArticleRequestService }  from '../../../request-services/article-request.service'

declare var swal: any

declare var tinymce: any;

@Component({
  selector: 'app-edit-article-language',
  templateUrl: './edit-article-language.component.html',
  styleUrls: ['./edit-article-language.component.sass']
})
export class EditArticleLanguageComponent implements OnInit, AfterViewInit, OnDestroy  {

    properties: any;

    article_content: any;

    language: any;

    @Input() elementId: string = "tinymce-textarea";

    @Output() onEditorKeyup = new EventEmitter<any>();

    editor: any

    constructor(
      public dialogRef: MdDialogRef<EditArticleLanguageComponent>,
      @Inject(MD_DIALOG_DATA) private data: any,
      private article: ArticleRequestService
    )
    {
      this.properties = data.properties

      this.article_content = data.data

      this.language = data.properties.languages.find( (obj) =>
        obj.id === data.data.language)
    }

    ngOnInit()  {
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

      tinymce.activeEditor.setContent(this.article_content.body)
    }

    ngOnDestroy() {
      tinymce.remove(this.editor);
    }

    editArticle(f: NgForm)
    {
      this.article.putContent({
        id: this.article_content.article_id,
        title: f.value.title,
        sub_title: f.value.sub_title,
        body: tinymce.activeEditor.getContent(  ),
        keywords: f.value.keywords,
        published: f.value.published ? 1 : 0,
        language: this.article_content.language,
      }).subscribe(response => {

        this.dialogRef.close(response.message);

        //swal(response.header, response.message, response.state)
      })
    }


}
