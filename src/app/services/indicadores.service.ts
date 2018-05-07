import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Indicador } from '../model/indicador';
import { config } from '../../app/config';
import { CRUDaction } from '../../app/interfaces/crud-action.interface';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';

@Injectable()
export class IndicadoresService implements CRUDaction<Indicador> {

  constructor(private http: Http) {

  }

    getItems(): Observable<Indicador[]> {
    return this.http.get(config.url + 'indicadores', { headers : this.getHeaders() }).map(
      response => {
        const indicators = new Array<Indicador>();
        const apiResponse = JSON.parse(response['_body']);
        if (!_.isNil(apiResponse)) {
          for (let index = 0; index < apiResponse.length; index++) {
            const element = apiResponse[index];
            indicators.push(new Indicador(element._id, element.id, element.descripcion));
          }
        }
        return indicators;
      }
    );
  }


  getItemById(_key: string ): Observable<Indicador> {
    return this.http.get(config.url + 'indicadores/' + _key, {headers : this.getHeaders() }).map(
        response => {
          const indicador = JSON.parse(response['_body']);
          return <Indicador>indicador;
        }
    );
  }


  updateItem(params: any) {
    return this.http.put(config.url + 'indicadores/' + params['_key'] ,
    { 'id': params['id'], 'descripcion': params['descripcion'] } ,
    {headers : this.getHeaders() } ).map(response => {
      const indicador = JSON.parse(response['_body']);
          return <Indicador>indicador;
    });
  }


  createItem(params: any): Observable<Indicador> {
    return this.http.post(config.url + 'indicadores' , params ,
    {headers : this.getHeaders() } ).map(response => {
      const indicador = JSON.parse(response['_body']);
          return <Indicador>indicador;
    });
  }

  deleteItem(_key: string): Observable<Indicador[]> {
    return this.http.delete(config.url + 'indicadores/' + _key,
    {headers : this.getHeaders() } ).map(response => {
        return null;
    });
  }


  private getHeaders() {
    return new Headers(  { 'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'});
  }
}
