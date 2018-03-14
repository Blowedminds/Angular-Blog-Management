import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLangugagesComponent } from './admin-langugages.component';

describe('AdminLangugagesComponent', () => {
  let component: AdminLangugagesComponent;
  let fixture: ComponentFixture<AdminLangugagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLangugagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLangugagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
