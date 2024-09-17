import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesHomeComponent } from './pacientes-home.component';

describe('PacientesHomeComponent', () => {
  let component: PacientesHomeComponent;
  let fixture: ComponentFixture<PacientesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientesHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
