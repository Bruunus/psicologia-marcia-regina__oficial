import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIdentificacaoComponent } from './update-identificacao.component';

describe('UpdateIdentificacaoComponent', () => {
  let component: UpdateIdentificacaoComponent;
  let fixture: ComponentFixture<UpdateIdentificacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateIdentificacaoComponent]
    });
    fixture = TestBed.createComponent(UpdateIdentificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
