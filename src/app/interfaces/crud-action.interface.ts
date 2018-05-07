import { Observable } from 'rxjs/Observable';

export interface CRUDaction<T extends Object> {

    getItems(): Observable<T[]>;

    getItemById(_key: string): Observable<T>;

    updateItem(parameters: any[]): Observable<T>;

    createItem(parameters: any[]): Observable<T>;


    deleteItem(_key: string): Observable<T[]>;

}
