import { TestBed } from '@angular/core/testing';

import { UnsubscribeServiceService } from './unsubscribe.service';

describe('UnsubscribeServiceService', () => {
  let service: UnsubscribeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsubscribeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
