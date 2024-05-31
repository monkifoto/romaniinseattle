import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLogComponent } from './error-log.component';

describe('ErrorLogComponent', () => {
  let component: ErrorLogComponent;
  let fixture: ComponentFixture<ErrorLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorLogComponent]
    });
    fixture = TestBed.createComponent(ErrorLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
