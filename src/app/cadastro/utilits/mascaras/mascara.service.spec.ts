import { TestBed } from '@angular/core/testing';

import { MascaraService } from './mascara.service';

describe('MascaraService', () => {
  let service: MascaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MascaraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
