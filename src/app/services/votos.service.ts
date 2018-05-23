import { Voto } from './../model/voto';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { config } from '../../app/config';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { VotantesService } from './votantes.service';
import { MuestraService } from './muestra.service';
import { IndicadoresService } from './indicadores.service';

@Injectable()
export class VotosService  {

  constructor(private http: Http,
    private votanteService: VotantesService,
    private muestraService: MuestraService,
    private indicadorService: IndicadoresService) {
  }

  getItems(): Observable<Voto[]> {

    const resp = this.http.get(config.url + 'voto',
    { headers : this.getHeaders()}).map(
      response => {
        return this.bindVotos(response);
      }
    );
    // .do(collection => {
    //   const elements = [];
    //   collection.forEach( (element) => {
    //     const elementResp =  forkJoin(
    //       this.votanteService.getItemById(element.idVotante),
    //       this.muestraService.getItemById(element.idMuestra),
    //       this.indicadorService.getItemById(element.idIndicador)
    //     ).map(([votanteResp, muestraResp, indicadorResp]) => {
    //        return new Voto(element._id, votanteResp.descripcion, muestraResp.descripcion,
    //          indicadorResp.descripcion, element.valoracion);
    //     });
    //     elementResp.subscribe(transformElement => elements.push(transformElement));
    //     });
  // });

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
  muestraId:    string,
  indicadorId:  string): Observable<Voto[]> {
    return this.http.get(config.url + 'voto/' + _votanteId + '/' +
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
}
