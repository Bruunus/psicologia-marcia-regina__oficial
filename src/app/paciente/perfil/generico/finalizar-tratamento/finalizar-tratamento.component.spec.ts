import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarTratamentoComponent } from './finalizar-tratamento.component';

describe('FinalizarTratamentoComponent', () => {
  let component: FinalizarTratamentoComponent;
  let fixture: ComponentFixture<FinalizarTratamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalizarTratamentoComponent]
    });
    fixture = TestBed.createComponent(FinalizarTratamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
