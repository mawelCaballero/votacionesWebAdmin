import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotanteDetailComponent } from './votante-detail.component';

describe('VotanteDetailComponent', () => {
  let component: VotanteDetailComponent;
  let fixture: ComponentFixture<VotanteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotanteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotanteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
