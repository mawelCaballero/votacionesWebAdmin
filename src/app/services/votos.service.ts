import { Voto } from './../model/voto';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { config } from '../../app/config';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { VotantesService } from './votantes.service';
import { MuestraService } from './muestra.service';
import { IndicadoresService } from './indicadores.service';
import * as _ from 'lodash';

@Injectable()
export class VotosService  {

  constructor(private http: Http,
    private votanteService: VotantesService,
    private muestraService: MuestraService,
    private indicadorService: IndicadoresService) {
  }

  getItems(): Observable<Voto[]> {

  const resp =  this.http.get(config.url + 'voto',
    { headers : this.getHeaders()}).
    map( response => {
      return response.json();
    });
     return resp;

  }


  getItemsByIdVotante(_votanteId: string): Observable<Voto[]> {

    return this.http.get(config.url + 'voto/' + _votanteId,
    { headers : this.getHeaders()}).map(
      response => {
        return this.bindVotos(response);
      }
    );
  }

  getItemsByCriteria(_votanteId: string,
  muestraId:    string
  ): Observable<Voto[]> {

    if (_.isNil(_votanteId) && _.isNil(muestraId)) {
      return this.getItems();
    }

    const url = this.generateUrl(_votanteId, muestraId);

    return this.http.get(url ,
    { headers : this.getHeaders()}, ).map(
      response => {
        return this.bindVotos(response);
      }
    );
  }

  deleteItem(_key: string): Observable<any> {
    return this.http.delete(config.url + 'voto/' + _key,
    {headers : this.getHeaders() }).map(response => {
        return null;
    });
  }

  private bindVotos(response: any): Voto[] {
    const votos = new Array<Voto>();
    const apiResponse = JSON.parse(response['_body']);
    if (apiResponse) {

      apiResponse.forEach(element => {
        votos.push(new Voto(element._id, element.idVotante,
          element.idMuestra, element.idIndicador,
          element.valoracion));
      });
    }
    return votos;
  }

  private getHeaders() {
    return new Headers(  { 'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'});
  }

  private generateUrl(user: string, muestra: string) {

    if (!_.isEmpty(user) && !_.isEmpty(muestra)) {
      return config.url + 'voto/' + user + `/${muestra}`;
    } else if (!_.isEmpty(user)) {
      return config.url + 'voto/' + user;
    } else if (!_.isEmpty(muestra)) {
      return config.url + 'voto/' + `${muestra}`;
    }
  }
}
