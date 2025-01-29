import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsComponent } from './bugs.component';

describe('BugsComponent', () => {
  let component: BugsComponent;
  let fixture: ComponentFixture<BugsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BugsComponent]
    });
    fixture = TestBed.createComponent(BugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
