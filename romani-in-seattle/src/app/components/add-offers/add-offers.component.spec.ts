import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOffersComponent } from './add-offers.component';

describe('AddJobComponent', () => {
  let component: AddOffersComponent;
  let fixture: ComponentFixture<AddOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOffersComponent]
    });
    fixture = TestBed.createComponent(AddOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
