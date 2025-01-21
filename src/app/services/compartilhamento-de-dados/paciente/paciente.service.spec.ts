import { TestBed } from '@angular/core/testing';

import { PacienteCompartilhamentoService } from './paciente.service';

describe('PacienteService', () => {
  let service: PacienteCompartilhamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteCompartilhamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
