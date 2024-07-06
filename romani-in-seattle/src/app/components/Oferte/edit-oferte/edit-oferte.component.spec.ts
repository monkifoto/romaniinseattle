import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOferteComponent } from './edit-oferte.component';

describe('EditOferteComponent', () => {
  let component: EditOferteComponent;
  let fixture: ComponentFixture<EditOferteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditOferteComponent]
    });
    fixture = TestBed.createComponent(EditOferteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
