import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaMuestraDetalleComponent } from './categoria-muestra-detalle.component';

describe('CategoriaMuestraDetalleComponent', () => {
  let component: CategoriaMuestraDetalleComponent;
  let fixture: ComponentFixture<CategoriaMuestraDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaMuestraDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaMuestraDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
