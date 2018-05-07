import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Categoria } from '../model/categoria';
import { config } from '../../app/config';
import { CRUDaction } from '../../app/interfaces/crud-action.interface';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoriaMuestraService implements CRUDaction<Categoria> {

  constructor(private http: Http) {

  }

    getItems(): Observable<Categoria[]> {
    return this.http.get(config.url + 'categoriaMuestra', { headers : this.getHeaders() }).map(
      response => {
        const categorias = new Array<Categoria>();
        const apiResponse = JSON.parse(response['_body']);
        if (!_.isNil(apiResponse)) {
          for (let index = 0; index < apiResponse.length; index++) {
            const element = apiResponse[index];
            categorias.push(new Categoria(element._id, element.id, element.descripcion));
          }
        }
        return categorias;
      }
    );
  }


  getItemById(_key: string ): Observable<Categoria> {
    return this.http.get(config.url + 'categoriaMuestra/' + _key, {headers : this.getHeaders() }).map(
        response => {
          const categoria = JSON.parse(response['_body']);
          return <Categoria>categoria;
        }
    );
  }


  updateItem(params: any) {
    return this.http.put(config.url + 'categoriaMuestra/' + params['_key'] ,
    { 'id': params['id'], 'descripcion': params['descripcion'] } ,
    {headers : this.getHeaders() } ).map(response => {
      const categoria = JSON.parse(response['_body']);
          return <Categoria>categoria;
    });
  }


  createItem(params: any): Observable<Categoria> {
    return this.http.post(config.url + 'categoriaMuestra' , params ,
    {headers : this.getHeaders() } ).map(response => {
      const categoria = JSON.parse(response['_body']);
          return <Categoria>categoria;
    });
  }

  deleteItem(_key: string): Observable<Categoria[]> {
    return this.http.delete(config.url + 'categoriaMuestra/' + _key,
    {headers : this.getHeaders() } ).map(response => {
        return null;
    });
  }


  private getHeaders() {
    return new Headers(  { 'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'});
  }
}
