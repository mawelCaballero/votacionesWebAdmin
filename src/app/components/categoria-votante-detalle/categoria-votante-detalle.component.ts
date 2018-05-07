import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaMuestraService } from '../../services/categoria-muestra.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { CategoriaVotanteService } from '../../services/categoria-votante.service';
import { GrowlService } from 'ngx-growl';

@Component({
  selector: 'app-categoria-votante-detalle',
  templateUrl: './categoria-votante-detalle.component.html',
  styleUrls: ['./categoria-votante-detalle.component.scss']
})
export class CategoriaVotanteDetalleComponent implements OnInit {

  categoriaForm: FormGroup;

  @Input()
  categoriaId: string;

  _id: string;

  id: string;

  descripcion: string;


  constructor(private categoriaService: CategoriaVotanteService, private fb: FormBuilder,
    public route: ActivatedRoute,
    private router: Router,
    private growlService: GrowlService) {
    this.route.params.subscribe(params => {
      if (!_.isNil(params['id'])) {
        this.categoriaId = params['categoriaMuestra'];
        this.categoriaService.getItemById(this.categoriaId).subscribe(
          response => {
            console.log('Mapping in service response');
            this._id = response._id;
            this.id = response.id;
            this.descripcion = response.descripcion;
          },
          error => {
            this.growlService.addError({heading: 'Error.', message: 'Se ha producido un error al recuperar la categoria'});

          }
        );
      }
    });

    this.categoriaForm = this.fb.group({
      id: ['',          Validators.compose([Validators.required, Validators.minLength(4)])],
      descripcion: ['', Validators.compose([Validators.required, Validators.minLength(100)])],
    });
  }

  ngOnInit() {
    console.log('Navigate to categoria votante detail ', this.categoriaId);
  }

  onSubmit() {

    if (_.isNil(this._id)) {
      this.categoriaService.createItem({'id': this.categoriaForm.value.id,
        'descripcion': this.categoriaForm.value.descripcion }).subscribe(
          response => {
            this.growlService.addInfo({heading: 'Info.', message: 'La categoria se ha insertado de forma correcta'});
            this.router.navigate(['/categoriasVotante']);

          },
          error => {
            this.growlService.addError({heading: 'Error.', message: 'Se ha producido un error al crear una nueva categoria'});

          });
    } else {
      this.categoriaService.updateItem(
        { '_key': this.categoriaForm.value.id,
          'id': this.categoriaForm.value.id,
        'descripcion': this.categoriaForm.value.descripcion }
      ).subscribe(response => {
        this.growlService.addInfo({heading: 'Info.', message: 'La categoria se ha actualizado de forma correcta'});
      },
      error => {
        this.growlService.addError({heading: 'Error.', message: 'Se ha producido un error al actualizar una nueva categoria'});
      });
    }
  }

}
