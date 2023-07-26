import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAdminCreatePackageComponent } from './web-admin-create-package.component';

describe('WebAdminCreatePackageComponent', () => {
  let component: WebAdminCreatePackageComponent;
  let fixture: ComponentFixture<WebAdminCreatePackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebAdminCreatePackageComponent]
    });
    fixture = TestBed.createComponent(WebAdminCreatePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
