import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndingSessionComponent } from './ending-session.component';

describe('EndingSessionComponent', () => {
  let component: EndingSessionComponent;
  let fixture: ComponentFixture<EndingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndingSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
