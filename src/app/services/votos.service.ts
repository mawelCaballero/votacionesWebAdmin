import { Voto } from './../model/voto';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { config } from '../../app/config';

@Injectable()
export class VotosService  {

  constructor(private http: Http) {
  }

  getItems(): Observable<Voto[]> {

    return this.http.get(config.url + 'votos',
    { headers : this.getHeaders()}).map(
      response => {
        return this.bindVotos(response);
      }
    );
  }


  getItemsByIdVotante(_votanteId: string): Observable<Voto[]> {
    return this.http.get(config.url + 'votos/' + _votanteId,
    { headers : this.getHeaders()}).map(
      response => {
        return this.bindVotos(response);
      }
    );
  }

  getItemsByCriteria(_votanteId: string,
  muestraId:    string,
  indicadorId:  string): Observable<Voto[]> {
    return this.http.get(config.url + 'votos/' + _votanteId + '/' +
    muestraId + '/' + indicadorId,
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
    if (!apiResponse) {
      for (let index = 0; index < apiResponse.length; index++) {
        const element = apiResponse[index];
        votos.push(new Voto(element._id, element.idVotante,
          element.idMuestra, element.idIndicador,
          element.valoracion));
      }
    }
    return votos;
  }

  private getHeaders() {
    return new Headers(  { 'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'});
  }
}
