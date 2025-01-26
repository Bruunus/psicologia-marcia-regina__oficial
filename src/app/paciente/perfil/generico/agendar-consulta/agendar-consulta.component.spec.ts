import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarConsultaComponent } from './agendar-consulta.component';

describe('AgendarConsultaComponent', () => {
  let component: AgendarConsultaComponent;
  let fixture: ComponentFixture<AgendarConsultaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendarConsultaComponent]
    });
    fixture = TestBed.createComponent(AgendarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
