import { TestBed } from '@angular/core/testing';

import { OrgaoEmissorService } from './orgao-emissor.service';

describe('OrgaoEmissorService', () => {
  let service: OrgaoEmissorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgaoEmissorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
