import { Observable } from 'rxjs/Observable';


export interface ObservableMap {
    /**
       map formed with a key, alias name, and a ServerResponse provided by an API Backend response
       @member
    */
      [key: string]: Observable<any>;
}
