import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanhamentoComponent } from './acompanhamento.component';

describe('AcompanhamentoComponent', () => {
  let component: AcompanhamentoComponent;
  let fixture: ComponentFixture<AcompanhamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcompanhamentoComponent]
    });
    fixture = TestBed.createComponent(AcompanhamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
