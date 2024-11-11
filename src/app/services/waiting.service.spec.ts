import { TestBed } from '@angular/core/testing';

import { WaitingService } from './waiting.service';

describe('WaitingService', () => {
  let service: WaitingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaitingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
