import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaMuestraComponent } from './categoria-muestra.component';

describe('CategoriaMuestraComponent', () => {
  let component: CategoriaMuestraComponent;
  let fixture: ComponentFixture<CategoriaMuestraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaMuestraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaMuestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
