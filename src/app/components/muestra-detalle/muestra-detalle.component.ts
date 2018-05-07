import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicadoresService } from '../../services/indicadores.service';
import * as _ from 'lodash';
import { MuestraService } from '../../services/muestra.service';
import { Indicador } from '../../model/indicador';
import { GrowlService } from 'ngx-growl';
import { CategoriaMuestraService } from '../../services/categoria-muestra.service';

@Component({
  selector: 'app-muestra-detalle',
  templateUrl: './muestra-detalle.component.html',
  styleUrls: ['./muestra-detalle.component.scss']
})
export class MuestraDetalleComponent implements OnInit {

  muestraForm: FormGroup;

  @Input()
  muestraId: string;
  _id: string;

  indicadoresSelected: any[];

  id: string;

  descripcion: string;

  categorias: any[];

  categoria: string;

  img: string;

  indicadores: any[];

  constructor(
     private muestraService: MuestraService,
     private indicadorService: IndicadoresService,
     private categoriaMuestraService: CategoriaMuestraService,
     private fb: FormBuilder,
     public route: ActivatedRoute,
     private router: Router,
     private growlService: GrowlService) {
     this.route.params.subscribe(params => {
      if (!_.isNil(params['muestra'])) {
        this.muestraId = params['muestra'];
          this.muestraService.getItemById(this.muestraId).subscribe(
            response => {
              console.log('Mapping in service response');
              this._id = response._id;
              this.id = response.id;
              this.descripcion = response.descripcion;
              if (!_.isNil(response.img)) {
                this.img = response.img;
              }
              this.categoria = response['categoria_muestra'];
              this.indicadoresSelected = response.indicadores;
            }
          );
      }
    });

    }

  ngOnInit() {
    this.indicadorService.getItems().subscribe(response => {
      this.indicadores = response;
   });

   this.categoriaMuestraService.getItems().subscribe(response => {
      this.categorias = response;
    });

   this.muestraForm = this.fb.group({
    id: ['',          Validators.compose([Validators.required, Validators.minLength(4)])],
    descripcion: ['', Validators.compose([Validators.required, Validators.minLength(100)])],
    categoria: ['', Validators.compose([Validators.required, Validators.minLength(100)])],
    indicadores: [],
  });
  }

  uploadFile(event) {
    const file = event.target;
    if (file.size > 0) {
      this.readThis(file);
    }
  }


  onSubmit() {
    if (_.isNil(this._id)) {
      this.muestraService.createItem(
        {
          'id': this.muestraForm.value.id,
          'descripcion': this.muestraForm.value.descripcion,
          'categoria': this.muestraForm.value.categoria,
          'indicadores': this.muestraForm.value.indicadores}
      ).subscribe(
        response => {
          this._id = response._id;
          this.growlService.addInfo({heading: 'Info.', message: 'La muestra se ha dado de alta de forma correcta'});
          this.router.navigate(['/muestras']);
        },
        error => {
          this.growlService.addError({heading: 'Error.', message: 'Se ha producido un error al dar de alta la muestra'});

        });
    } else {
      this.muestraService.updateItem(
        { '_key': this._id,
          'id': this.muestraForm.value.id,
          'descripcion': this.muestraForm.value.descripcion,
          'categoria': !_.isEmpty(this.muestraForm.value.categoria) ? this.muestraForm.value.categoria : this.categoria,
          'indicadores': this.muestraForm.value.indicadores
        }
      ).subscribe(
        response => {
          this.growlService.addInfo({heading: 'Info.', message: 'La muestra se ha modificado de forma correcta'});
        },
        error => {
          this.growlService.addError({heading: 'Error.', message: 'Se ha producido un error al modificar la muestra'});

        }
    );
    }
  }

  private readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.img = myReader.result;
      this.muestraService.updateImage(this._id, {'myFile': this.img}).subscribe(
        response => {
          this.growlService.addInfo({heading: 'Info.', message: 'La imagen se ha subido de forma correcta'});
        },
        error => {
          this.growlService.addError({heading: 'Error.', message: 'Se ha producido un error al subir la imagen'});

        }
      );
    };
    myReader.readAsDataURL(file);
  }


  compareWithFn(item1, item2) {
    return item1 && item2 ? item1._id === item2 : item1 === item2;
  }
}
