import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Muestra } from '../model/muestra';
import { Votante } from '../model/votante';
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
export class VotantesService implements CRUDaction<Votante> {

  constructor(private http: Http) {

  }
  getItems(): Observable<Votante[]> {

    return this.http.get(config.url + 'votantes', { headers : this.getHeaders() }).map(
      response => {
        return this.bindVotantes(response);
      }
    );
  }



  getItemById(_key: string ): Observable<Votante> {
    return this.http.get(config.url + 'votantes/' + _key, { headers : this.getHeaders() }).map(
        response => {
          const votante = JSON.parse(response['_body']);
          return <Votante>votante;
        }
    );
  }

  updateItem(params: any) {
    return this.http.put(config.url + 'votantes/' + params['_key'] ,
    { 'id': params['id'], 'user': params['user'],
      'pass': params['pass'],
      'email': params['email'],
      'descripcion': params['descripcion'],
      'voto': params['voto'],
      'tipo_votante': params['tipo_votante'],
      'muestras': params['muestras']
    } ,
    {headers : this.getHeaders() } ).map(response => {
      const votante = JSON.parse(response['_body']);
          return <Votante>votante;
    });
  }

  createItem(params: any) {
    return this.http.post(config.url + 'votantes' , params ,
    {headers : this.getHeaders() } ).map(response => {
      const votante = JSON.parse(response['_body']);
          return <Votante>votante;
    });
  }


  deleteItem(_key: string): Observable<Votante[]> {
    return this.http.delete(config.url + 'muestras/' + _key,
    {headers : this.getHeaders() } ).map(response => {
      return this.bindVotantes(response);
    });
  }

  private getHeaders() {
    return new Headers(  { 'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'});
  }



  private bindVotantes(response: any): Votante[] {
    const votantes = new Array<Votante>();
    const apiResponse = JSON.parse(response['_body']);
    if (!_.isNil(apiResponse)) {
      for (let index = 0; index < apiResponse.length; index++) {
        const element = apiResponse[index];
        votantes.push(new Votante(element._id, element.id, element.user, element.pass,
          element.descripcion, element.email,
          element.voto, element.tipo_votante, element.muestras));
      }
    }
    return votantes;
  }
}
