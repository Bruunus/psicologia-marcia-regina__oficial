import { TestBed } from '@angular/core/testing';

import { LoadingDocumentosService } from './loading-documentos.service';

describe('LoadingDocumentosService', () => {
  let service: LoadingDocumentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingDocumentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
