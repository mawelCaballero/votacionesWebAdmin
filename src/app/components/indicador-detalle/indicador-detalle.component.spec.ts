import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorDetalleComponent } from './indicador-detalle.component';

describe('IndicadorDetalleComponent', () => {
  let component: IndicadorDetalleComponent;
  let fixture: ComponentFixture<IndicadorDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
