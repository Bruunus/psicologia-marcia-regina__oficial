import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInfoMessageComponent } from './display-info-message.component';

describe('DisplayInfoMessageComponent', () => {
  let component: DisplayInfoMessageComponent;
  let fixture: ComponentFixture<DisplayInfoMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayInfoMessageComponent]
    });
    fixture = TestBed.createComponent(DisplayInfoMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
