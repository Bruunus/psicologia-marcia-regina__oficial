import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallSmartphonesComponent } from './small-smartphones.component';

describe('SmallSmartphonesComponent', () => {
  let component: SmallSmartphonesComponent;
  let fixture: ComponentFixture<SmallSmartphonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallSmartphonesComponent]
    });
    fixture = TestBed.createComponent(SmallSmartphonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
