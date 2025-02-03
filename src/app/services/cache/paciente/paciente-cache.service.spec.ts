import { TestBed } from '@angular/core/testing';

import { PacienteCacheService } from './paciente-cache.service';

describe('PacienteCacheService', () => {
  let service: PacienteCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
