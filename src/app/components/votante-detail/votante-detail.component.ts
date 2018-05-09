import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VotantesService } from '../../services/votantes.service';
import { MuestraService } from '../../services/muestra.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Muestra } from '../../model/muestra';
import { CategoriaVotanteService } from '../../services/categoria-votante.service';
import { GrowlService } from 'ngx-growl';
import { Categoria } from '../../model/categoria';

@Component({
  selector: 'app-votante-detail',
  templateUrl: './votante-detail.component.html',
  styleUrls: ['./votante-detail.component.scss']
})
export class VotanteDetailComponent implements OnInit {

  votanteForm: FormGroup;

  @Input()
  votanteId: string;
  _id: string;

  muestrasSelected: any[];

  id: string;

  user: string;

  pass: string;

  email: string;

  descripcion: string;

  voto: string;

  tipos: any[];

  tipo_votante: string;

  muestras: any[];

  constructor(private muestraService: MuestraService,
    private categoriaVotanteService: CategoriaVotanteService,
    private votanteService: VotantesService,
    private growlService: GrowlService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private router: Router) {

    this.muestraService.getItems().subscribe(response => {
        this.muestras = response;
    });


   this.categoriaVotanteService.getItems().subscribe(response => {
    this.tipos = response;
  });

    this.route.params.subscribe(params => {
      if (!_.isNil(params['votante'])) {
        this.votanteId = params['votante'];
        this.votanteService.getItemById(this.votanteId).subscribe(
          response => {
            console.log('Mapping in service response');
            this._id = response._id;
            this.id = response.id;
            this.descripcion = response.descripcion;
            this.tipo_votante = response.tipo_votante;
            this.user = response.user;
            this.email = response.email;
            this.pass = response.pass;
            this.muestrasSelected = response.muestras;
          }
        );
      }
    });

    this.votanteForm = this.fb.group({
      id: ['',          Validators.compose([Validators.required, Validators.minLength(4)])],
      user: ['',          Validators.compose([Validators.required, Validators.minLength(100)])],
      pass: ['',          Validators.compose([Validators.required, Validators.minLength(100)])],
      email: ['',          Validators.compose([Validators.required, Validators.email])],
      descripcion: ['', Validators.compose([Validators.required, Validators.minLength(100)])],
      voto: [false, Validators.compose([Validators.required])],
      tipo_votante: ['', Validators.compose([Validators.required, Validators.minLength(100)])],
      muestras: [],
    });


      }

    ngOnInit() {
    }

    onSubmit() {
      if (_.isNil(this._id)) {
        this.votanteService.createItem(
          { 'id': this.votanteForm.value.id,
            'user': this.votanteForm.value.user,
            'pass': this.votanteForm.value.pass,
            'email': this.votanteForm.value.email,
            'descripcion': this.votanteForm.value.descripcion,
            'tipo_votante': this.transformCategoriesToCode(this.votanteForm.value.tipo_votante),
            'muestras': this.transformMuestrasToCode(this.votanteForm.value.muestras)}
        ).subscribe(response => {
          this._id = response._id;
          this.growlService.addInfo({heading: 'Info.', message: 'El cliente se ha dado de alta de forma correcta'});
          this.router.navigate(['/votantes']);
        },
        error => {
          this.growlService.addError({heading: 'Error.', message: 'Se ha producido un error al dar de alta el cliente'});

        });
      } else {
        this.votanteService.updateItem(
          { '_key': this._id,
          'id': this.votanteForm.value.id,
          'user': this.votanteForm.value.user,
          'pass': this.votanteForm.value.pass,
          'voto': false,
          'email': this.votanteForm.value.email,
          'descripcion': this.votanteForm.value.descripcion,
          'tipo_votante': !_.isNil(this.votanteForm.value.tipo_votante)  && !_.isEmpty(this.votanteForm.value.tipo_votante) ?
           this.votanteForm.value.tipo_votante : this.tipo_votante,
          'muestras': this.transformMuestrasToCode(this.votanteForm.value.muestras)
          }
        ).subscribe( response => {
          this.growlService.addInfo({heading: 'Info.', message: 'El votante se ha modificado de forma correcta'});
        },
        error => {
          this.growlService.addError({heading: 'Error.', message: 'Se ha producido un error al modificar el votante'});

        });
      }
    }

    compareWithFn(item1, item2) {
      return item1 && item2 ? item1._id === item2 : item1 === item2;
    }

    private transformMuestrasToCode(listMuestras: Muestra[]) {
      const codes = new Array<string>();

      listMuestras.forEach(element => {
        codes.push(element['_id']);
      });

      return codes;

    }


    private transformCategoriesToCode(category: Categoria) {
     return category._id;

    }
}
