import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Muestra } from '../model/muestra';
import { CRUDaction } from '../interfaces/crud-action.interface';
import { Observable } from 'rxjs/Observable';
import { config } from '../../app/config';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import { IndicadoresService } from './indicadores.service';
import { Indicador } from '../model/indicador';
@Injectable()
export class MuestraService implements CRUDaction<Muestra> {

  constructor(private http: Http, private indicadorService: IndicadoresService) {

  }


  getItems(): Observable<Muestra[]> {

    return this.http.get(config.url + 'muestras', { headers : this.getHeaders() }).map(
      response => {
        return this.bindMuestras(response);
      }
    );  }



  getItemById(_key: string ): Observable<Muestra> {
    return this.http.get(config.url + 'muestras/' + _key, { headers : this.getHeaders() }).map(
        response => {
          const muestra = JSON.parse(response['_body']);
          return <Muestra>muestra;
        }
    );
  }


  updateItem(params: any) {
    return this.http.put(config.url + 'muestras/' + params['_key'] ,
    { 'id': params['id'],
      'descripcion': params['descripcion'],
      'categoria': params['categoria'],
      'indicadores': params['indicadores']
    } ,
    {headers : this.getHeaders() } ).map(response => {
      const muestra = JSON.parse(response['_body']);
          return <Muestra>muestra;
    });
  }


  createItem(params: any) {
    return this.http.post(config.url + 'muestras' , params ,
    {headers : this.getHeaders() } ).map(response => {
      const muestra = JSON.parse(response['_body']);
          return <Muestra>muestra;
    });
  }

  deleteItem(_key: string): Observable<Muestra[]> {
    return this.http.delete(config.url + 'muestras/' + _key,
    {headers : this.getHeaders() } ).map(response => {
      return this.bindMuestras(response);
    });
  }


  updateImage(_key: string, file: any) {
    return this.http.post(config.url + 'muestras/uploadImage/' + _key , file ).map(response => {
      const muestra = JSON.parse(response['_body']);
          return <Muestra>muestra;
    });
  }


  private getHeaders() {
    return new Headers(  { 'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'});
  }



  private bindMuestras(response: any): Muestra[] {
    const muestras = new Array<Muestra>();
    const apiResponse = JSON.parse(response['_body']);
    if (!_.isNil(apiResponse)) {
      for (let index = 0; index < apiResponse.length; index++) {
        const element = apiResponse[index];
        muestras.push(new Muestra(element._id, element.id, element.descripcion, element.categoria_muestra, element.img, element.indicador));
      }
    }
    return muestras;
  }
}

