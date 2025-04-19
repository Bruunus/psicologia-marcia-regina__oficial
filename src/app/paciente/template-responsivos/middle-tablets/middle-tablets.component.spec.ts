import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleTabletsComponent } from './middle-tablets.component';

describe('MiddleTabletsComponent', () => {
  let component: MiddleTabletsComponent;
  let fixture: ComponentFixture<MiddleTabletsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiddleTabletsComponent]
    });
    fixture = TestBed.createComponent(MiddleTabletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
