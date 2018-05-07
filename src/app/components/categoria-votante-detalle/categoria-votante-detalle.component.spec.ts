import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaVotanteDetalleComponent } from './categoria-votante-detalle.component';

describe('CategoriaVotanteDetalleComponent', () => {
  let component: CategoriaVotanteDetalleComponent;
  let fixture: ComponentFixture<CategoriaVotanteDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaVotanteDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaVotanteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
