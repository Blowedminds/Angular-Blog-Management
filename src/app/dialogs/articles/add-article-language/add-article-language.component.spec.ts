import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleLanguageComponent } from './add-article-language.component';

describe('AddArticleLanguageComponent', () => {
  let component: AddArticleLanguageComponent;
  let fixture: ComponentFixture<AddArticleLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticleLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
