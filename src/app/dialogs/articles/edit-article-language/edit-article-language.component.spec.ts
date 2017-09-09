import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticleLanguageComponent } from './edit-article-language.component';

describe('EditArticleLanguageComponent', () => {
  let component: EditArticleLanguageComponent;
  let fixture: ComponentFixture<EditArticleLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArticleLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticleLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
