import { TestBed } from '@angular/core/testing';

import { GerenciadoDeAutenticacaoService } from './gerenciador-de-autenticacao.service';

describe('AutenticacaoService', () => {
  let service: GerenciadoDeAutenticacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciadoDeAutenticacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
