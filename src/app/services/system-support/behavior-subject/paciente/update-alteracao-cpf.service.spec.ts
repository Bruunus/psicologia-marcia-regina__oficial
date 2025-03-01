import { TestBed } from '@angular/core/testing';

import { UpdateAlteracaoCpfService } from './update-alteracao-cpf.service';

describe('UpdateAlteracaoCpfService', () => {
  let service: UpdateAlteracaoCpfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateAlteracaoCpfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
