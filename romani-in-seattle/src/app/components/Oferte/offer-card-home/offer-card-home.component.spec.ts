import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCardHomeComponent } from './offer-card-home.component';

describe('OfferCardHomeComponent', () => {
  let component: OfferCardHomeComponent;
  let fixture: ComponentFixture<OfferCardHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferCardHomeComponent]
    });
    fixture = TestBed.createComponent(OfferCardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
