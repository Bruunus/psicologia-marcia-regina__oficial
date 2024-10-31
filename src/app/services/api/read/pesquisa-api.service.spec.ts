import { TestBed } from '@angular/core/testing';

import { PesquisaApiService } from './pesquisa-api.service';

describe('PesquisaService', () => {
  let service: PesquisaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesquisaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
