import { Component, OnInit, Inject, OnDestroy, AfterViewInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';

import * as tinymce from 'tinymce/tinymce';

import { CacheService, HelpersService, ImageSelectComponent } from '../../imports';
import { ArticleService } from '../../services/article.service';
import { ArticleRequestService } from '../../services/article-request.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.sass']
})
export class ArticleAddComponent implements OnInit, OnDestroy {

  published = false;

  add_categories: Array<any> = [];

  languages: any;

  categories: any;

  image_name: string;

  subs = new Subscription();

  @Input() elementId = 'tinymce-textarea';

  @Output() onEditorKeyup = new EventEmitter<any>();

  editor: any;

  @ViewChild('tiny') set tiny(tiny:ElementRef)
  {
    if (this.languages && this.categories) {
      setTimeout(() => this.runTinymce(), 0);
    }
  }

  constructor(
    private articleRequestService: ArticleRequestService,
    private cacheService: CacheService,
    private helpersService: HelpersService,
    private dialog: MatDialog
  )
  {
    this.cacheService.get('languages', this.articleRequestService.makeGetRequest('admin.languages'))
                      .subscribe( response => this.languages = response);

    this.cacheService.get('categories', this.articleRequestService.makeGetRequest('admin.categories'))
                      .subscribe( response => this.categories = response);

  }

  ngOnInit()  {
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

                const rq1 = ImageSelectDialog.afterClosed().subscribe( response => {
                  editor.insertContent(`<img src="${response.image_url}" alt="${response.alt}" width="${response.width}" height="${response.height}" />`)

                  rq1.unsubscribe();
                });
              }
            });

        this.editor = editor;
      },
    });
  }

  addArticle(f: NgForm)
  {
    const categories = this.add_categories.map( category => category.id);

    const rq1 = this.articleRequestService.putArticle({
      title: f.value.title,
      sub_title: f.value.sub_title,
      body: tinymce.activeEditor.getContent(),
      keywords: f.value.keywords,
      published: f.value.published ? 1 : 0,
      language_id: f.value.language_id,
      slug: f.value.slug,
      category: categories,
      image: this.image_name
    }).subscribe(response => this.helpersService.navigate(['/articles']));

    this.subs.add(rq1);
  }

  addCategory(item: any)
  {
    if (typeof item.selected.value == 'undefined' || item.selected.value == null) return;

    const index = this.categories.findIndex( obj => obj.id === item.selected.value);

    this.add_categories.push(this.categories[index]);

    this.categories.splice(index, 1);
  }

  deleteCategory(item: any)
  {
    this.categories.push(this.categories[item]);

    this.add_categories.splice(item, 1);
  }

  openImageSelect()
  {
    const dialogRef = this.dialog.open(ImageSelectComponent, {
      data: {
        image_request: this.articleRequestService.makeGetRequest('image.images'),
        thumb_image_url: this.articleRequestService.makeUrl('image.thumb')
      }
    });

    const rq2 = dialogRef.afterClosed().subscribe( response => {

      const el = document.getElementById('img');

      el.setAttribute('src', response.thumb_url);

      this.image_name = response.u_id;

      rq2.unsubscribe();
    });
  }
}
