import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';

describe('ErrorComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent]
    });
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
