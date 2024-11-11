import { TestBed } from '@angular/core/testing';

import { MessageApiGenericsService } from './message-api-generics.service';

describe('MessageApiService', () => {
  let service: MessageApiGenericsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageApiGenericsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
