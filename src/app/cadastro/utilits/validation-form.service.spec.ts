import { TestBed } from '@angular/core/testing';

import { ValidationFormService } from './validation-form.service';

describe('ValidationFormService', () => {
  let service: ValidationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
