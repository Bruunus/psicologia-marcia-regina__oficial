import { TestBed } from '@angular/core/testing';

import { AlteracaoDisplayService } from './alteracao-display.service';

describe('PacienteService', () => {
  let service: AlteracaoDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlteracaoDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
