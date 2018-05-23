import { ResourceMap } from '../model/resource';
import { ObservableMap } from '../model/observable';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Inject
export class CacheService {
      map: ResourceMap = {};

      observableMap: ObservableMap = {};


      public processResponse(response: any, operation: string) {
        this.createElementResourceDirectory(response);
        response.processEmbedded(this);
      }
      /**
       * The processObservable will take the response observable from http.get  operation.
       * and store it in a map for reducing the total number of http.get Calls
       *
       * @method processObservable
       * @param url {string} key fir identifying the observable in the map .
       * @param observable {Observable<any>} retrieved by http.get operation .
       * @public
       */
      public processObservable(url: string, observable: Observable<any>) {
        this.observableMap[url] = observable;
      }
      /**
        * The checkElementResourceDirectory method will check if
        * the resource exist in our map given a key paramater, in this case is the key.
        * Otherwise will return a false value to API Caller.
        * @method checkElementResourceDirectory
        * @param url {string} key valid for checking if we have an existing response with this key
        * @returns true or false depending if the resource exist into map
        * @public
      */
      public checkElementResourceDirectory(url: string) {
        if (this.map[url]) {
          return true;
        }
        return false;
      }

  public checkObservableDirectory(url: string) {
    if (this.observableMap[url]) {
      return true;
    }
    return false;
  }


  public getElementResourceDirectory(url: string): any {
    if (url && _.isNil(this.map[url])) {
      url = _.split(url, '?')[0];
    }
    return this.map[url];
  }

  createElementResourceDirectory(resource: any) {
    if (!this.map[resource.url]) {
      this.map[resource.url] = resource;
    } else {
      this.updateElementResourceDirectory(resource.url, resource);
    }
  }


  updateElementResourceDirectory(url: string, resource: any) {
    if (this.map[url]) {
      this.map[url] = resource;
    }
  }


  public deleteElementResourceDirectory(url: string) {
    if (this.map[url]) {
      delete this.map[url];
    }

  }


  public deleteElementObservableDirectory(url: string) {
    if (this.observableMap[url]) {
      delete this.observableMap[url];
    }

  }


  public getElementObservableDirectory(url: string): Observable<any> {
    return this.observableMap[url];
  }
}
