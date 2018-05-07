import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Indicador } from '../../model/indicador';
import { IndicadoresService } from '../../services/indicadores.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { GrowlService } from 'ngx-growl';

@Component({
  selector: 'app-indicador-detalle',
  templateUrl: './indicador-detalle.component.html',
  styleUrls: ['./indicador-detalle.component.css']
})
export class IndicadorDetalleComponent implements OnInit {


  indicadorForm: FormGroup;

  @Input()
  indicadorId: string;

  _id: string;

  id: string;

  descripcion: string;


  constructor(private indicadorService: IndicadoresService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private router: Router,
    private growlService: GrowlService) {
    this.route.params.subscribe(params => {
      if (!_.isNil(params['indicador'])) {
        this.indicadorId = params['indicador'];
        this.indicadorService.getItemById(this.indicadorId).subscribe(
          response => {
            console.log('Mapping in service response');
            this._id = response._id;
            this.id = response.id;
            this.descripcion = response.descripcion;
          },
          error => {
            this.growlService.addError({heading: 'Error.', message: 'Se ha producido un error al recuperar los indicadores'});
          }
        );
      }
    });

    this.indicadorForm = this.fb.group({
      id: ['',          Validators.compose([Validators.required, Validators.minLength(4)])],
      descripcion: ['', Validators.compose([Validators.required, Validators.minLength(100)])],
    });
  }

  ngOnInit() {
    console.log('Navigate to indicador detail ', this.indicadorId);
  }

  onSubmit() {

    if (_.isNil(this._id)) {
      this.indicadorService.createItem({'id': this.indicadorForm.value.id,
        'descripcion': this.indicadorForm.value.descripcion }).subscribe(
          response => {
            this.growlService.addSuccess({heading: 'OK.', message: 'Se ha dado el alta de indicador de forma correcta'});
            this.router.navigate(['/indicadores']);

          },
          error => {
            this.growlService.addError({heading: 'Error.', message: 'Se ha producido un error al crear el indicador'});
          });
    } else {
      this.indicadorService.updateItem(
        { '_key': this._id,
          'id': this.indicadorForm.value.id,
        'descripcion': this.indicadorForm.value.descripcion }
      ).subscribe(
        response => {
          this.growlService.addSuccess({heading: 'OK.', message: 'Se ha modificado el indicador de forma correcta'});
        },
        error => {
          this.growlService.addError({heading: 'Error.', message: 'Se ha producido un error al actualizar el indicador'});

        });
    }
  }
}
