import { Component, OnInit, Inject, OnDestroy, AfterViewInit, EventEmitter, Input, Output  } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms'

import { ArticleRequestService }  from '../../../request-services/article-request.service'

import { ImageSelectComponent } from '../../albums/image-select/image-select.component'

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
      private article: ArticleRequestService,
      public dialog: MdDialog,
    )
    {
      this.properties = data.properties

      this.article_content = data.data

      let lang =  data.properties.languages.find( (obj) =>
          obj.id === data.data.language)

      if(lang){
        this.language = lang
      }else{
        this.language = {name: "NullLanguage", id: 0}
      }
    }

    ngOnInit()  {
    }

    ngAfterViewInit() {
      tinymce.init({
        selector: '#' + this.elementId,
        plugins: ['link', 'paste', 'table', 'image', 'fullscreen'],
        toolbar: 'image | fullscreen',
        skin_url: '/assets/skins/lightgray',
        setup: editor => {

          let dialog = this.dialog

          editor.on('keyup', () => {

            const content = editor.getContent();
            this.onEditorKeyup.emit(content);
          });

          editor.addMenuItem('myitem', {
                text: 'Add Image',
                context: 'tools',
                onclick: function() {
                  let ImageSelectDialog = dialog.open(ImageSelectComponent)

                  let rq1 = ImageSelectDialog.afterClosed().subscribe( response => {
                    editor.insertContent(`<img src="${response.image_url}" alt="${response.alt}" width="${response.width}" height="${response.height}" />`)

                    rq1.unsubscribe()
                    rq1 = null
                  })
                }
              });

          this.editor = editor;
        },
      });

      tinymce.activeEditor.setContent(this.article_content.body)
    }

    ngOnDestroy() {
      tinymce.remove(this.editor);
    }

    editArticle(f: NgForm)
    {
      let rq2 = this.article.putContent({
        id: this.article_content.article_id,
        title: f.value.title,
        sub_title: f.value.sub_title,
        body: tinymce.activeEditor.getContent(  ),
        keywords: f.value.keywords,
        published: f.value.published ? 1 : 0,
        language: this.article_content.language,
      }).subscribe(response => {

        this.dialogRef.close(response.message);
        rq2.unsubscribe()
        rq2 = null
        //swal(response.header, response.message, response.state)
      })
    }


}
