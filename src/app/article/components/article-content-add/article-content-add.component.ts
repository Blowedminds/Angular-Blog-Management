import { Component, OnInit, Inject, OnDestroy, AfterViewInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';

import { MatDialog } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms'

import * as tinymce from 'tinymce/tinymce';

import { CacheService, ImageSelectComponent } from '../../imports';
import { ArticleService } from '../../services/article.service';
import { ArticleRequestService } from '../../services/article-request.service';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-article-content-add',
  templateUrl: './article-content-add.component.html',
  styleUrls: ['./article-content-add.component.sass']
})
export class ArticleContentAddComponent implements OnInit, OnDestroy {

  article: any;

  add_languages: any;

  @Input() elementId = 'tinymce-textarea';

  @Output() onEditorKeyup = new EventEmitter<any>();

  editor: any;

  subs = new Subscription();

  @ViewChild('tiny') set tiny(tiny: ElementRef)
  {
    if (this.add_languages) {

      setTimeout(() => this.runTinymce(), 0);
    }
  }

  constructor(
    private route: ActivatedRoute,
    private articleRequestService: ArticleRequestService,
    private cacheService: CacheService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    const rq1 = this.route.params.pipe(switchMap( (params: Params) => this.articleRequestService.getArticle(params['slug']))
)                     .subscribe(response => {

                        this.article = response;

                        const rq2 = this.cacheService.get('languages', this.articleRequestService.makeGetRequest('admin.languages'))
                          .subscribe( languages => {
                            this.add_languages = languages;

                            for (const content of response.contents) {

                              this.add_languages = this.add_languages.filter( language => language.id !== content.language_id)
                            }
                          });

                        // this.subs.add(rq2)
                      });
    this.subs.add(rq1);
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);

    this.subs.unsubscribe();
  }

  runTinymce()
  {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table', 'image'],
      toolbar: 'image',
      skin_url: '/assets/skins/lightgray',
      setup: editor => {

        const dialog = this.dialog;

        editor.on('keyup', () => {

          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });

        editor.addMenuItem('myitem', {
              text: 'Add Image',
              context: 'tools',
              onclick: function() {
                const ImageSelectDialog = dialog.open(ImageSelectComponent);

                let rq1 = ImageSelectDialog.afterClosed().subscribe( response => {
                  editor.insertContent(`<img src="${response.image_url}" alt="${response.alt}" width="${response.width}" height="${response.height}" />`)

                  rq1.unsubscribe();
                  rq1 = null;
                });
              }
            });

        this.editor = editor;
      },
    });
  }

  addLanguageArticle(f: NgForm)
  {
    const rq1 = this.articleRequestService.putArticleContent(this.article.id, {
      title: f.value.title,
      sub_title: f.value.sub_title,
      body: tinymce.activeEditor.getContent(),
      keywords: f.value.keywords,
      published: f.value.published ? 1 : 0,
      language_id: f.value.language_id
    }).subscribe( (response) => alert('success'));

    this.subs.add(rq1);
  }

}
