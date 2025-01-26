import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaudoComponent } from './laudo.component';

describe('LaudoComponent', () => {
  let component: LaudoComponent;
  let fixture: ComponentFixture<LaudoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaudoComponent]
    });
    fixture = TestBed.createComponent(LaudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
