import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPacienteInfoMessageComponent } from './cadastro-paciente-info-message.component';

describe('DisplayInfoMessageComponent', () => {
  let component: CadastroPacienteInfoMessageComponent;
  let fixture: ComponentFixture<CadastroPacienteInfoMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroPacienteInfoMessageComponent]
    });
    fixture = TestBed.createComponent(CadastroPacienteInfoMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
