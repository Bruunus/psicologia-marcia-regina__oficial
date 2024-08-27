import { TestBed } from '@angular/core/testing';

import { ApiAutenticacaoService } from './api-autenticacao.service';

describe('ApiAutenticacaoService', () => {
  let service: ApiAutenticacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAutenticacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
