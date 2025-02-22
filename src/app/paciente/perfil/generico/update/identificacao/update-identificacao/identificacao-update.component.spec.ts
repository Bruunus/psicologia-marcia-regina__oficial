import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacaoUpdateComponent } from './identificacao-update.component';

describe('IdentificacaoUpdateComponent', () => {
  let component: IdentificacaoUpdateComponent;
  let fixture: ComponentFixture<IdentificacaoUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdentificacaoUpdateComponent]
    });
    fixture = TestBed.createComponent(IdentificacaoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
