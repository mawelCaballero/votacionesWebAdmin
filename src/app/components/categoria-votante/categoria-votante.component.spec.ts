import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaVotanteComponent } from './categoria-votante.component';

describe('CategoriaVotanteComponent', () => {
  let component: CategoriaVotanteComponent;
  let fixture: ComponentFixture<CategoriaVotanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaVotanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaVotanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
