import { TestBed } from '@angular/core/testing';

import { IdentificacaoService } from './identificacao.service';

describe('IdentificacaoService', () => {
  let service: IdentificacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentificacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
