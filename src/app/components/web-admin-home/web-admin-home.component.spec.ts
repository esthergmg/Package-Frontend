import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAdminHomeComponent } from './web-admin-home.component';

describe('WebAdminHomeComponent', () => {
  let component: WebAdminHomeComponent;
  let fixture: ComponentFixture<WebAdminHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebAdminHomeComponent]
    });
    fixture = TestBed.createComponent(WebAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
