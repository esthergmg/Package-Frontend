import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAdminCreateDeliveryComponent } from './web-admin-create-delivery.component';

describe('WebAdminCreateDeliveryComponent', () => {
  let component: WebAdminCreateDeliveryComponent;
  let fixture: ComponentFixture<WebAdminCreateDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebAdminCreateDeliveryComponent]
    });
    fixture = TestBed.createComponent(WebAdminCreateDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
