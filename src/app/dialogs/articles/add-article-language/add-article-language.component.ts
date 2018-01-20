import { Component, OnInit, Inject, OnDestroy, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms'

import { ArticleRequestService }  from '../../../request-services/article-request.service'

import { ImageSelectComponent } from '../../albums/image-select/image-select.component'

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
      public dialogRef: MatDialogRef<AddArticleLanguageComponent>,
      @Inject(MAT_DIALOG_DATA) private data: any,
      private article: ArticleRequestService,
      public dialog: MatDialog
    )
    {
        let item = data.properties.languages

        for(let i = 0; i < data.data.contents.length; i++)
          item = item.filter( (obj) => obj.id !== data.data.contents[i].language)

        this.properties = item

        this.id = data.data.id
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
      tinymce.init({
        selector: '#' + this.elementId,
        plugins: ['link', 'paste', 'table', 'image'],
        toolbar: 'image',
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
    }

    ngOnDestroy() {
      tinymce.remove(this.editor);
    }


    addLanguageArticle(f: NgForm)
    {
      let rq1 = this.article.postContent({
        id: this.id,
        title: f.value.title,
        sub_title: f.value.sub_title,
        body: tinymce.activeEditor.getContent(),
        keywords: f.value.keywords,
        published: f.value.published ? 1 : 0,
        language: f.value.language
      }).subscribe( (response) => {

        this.dialogRef.close(response.message);
        rq1.unsubscribe()
        rq1 = null
        //swal(response.header, response.message, response.state)
      })
    }
  }
