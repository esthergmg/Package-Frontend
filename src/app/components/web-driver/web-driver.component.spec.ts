import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDriverComponent } from './web-driver.component';

describe('WebDriverComponent', () => {
  let component: WebDriverComponent;
  let fixture: ComponentFixture<WebDriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebDriverComponent]
    });
    fixture = TestBed.createComponent(WebDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
