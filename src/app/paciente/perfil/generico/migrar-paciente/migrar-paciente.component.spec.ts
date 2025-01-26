import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrarPacienteComponent } from './migrar-paciente.component';

describe('MigrarPacienteComponent', () => {
  let component: MigrarPacienteComponent;
  let fixture: ComponentFixture<MigrarPacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MigrarPacienteComponent]
    });
    fixture = TestBed.createComponent(MigrarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
