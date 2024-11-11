import { TestBed } from '@angular/core/testing';

import { MessageCadastroPacienteService } from './message-cadastro-paciente.service';

describe('MessageApiService', () => {
  let service: MessageCadastroPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageCadastroPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
