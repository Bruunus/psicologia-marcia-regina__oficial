import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteDeComponentesComponent } from './teste-de-componentes.component';

describe('TesteDeComponentesComponent', () => {
  let component: TesteDeComponentesComponent;
  let fixture: ComponentFixture<TesteDeComponentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesteDeComponentesComponent]
    });
    fixture = TestBed.createComponent(TesteDeComponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
