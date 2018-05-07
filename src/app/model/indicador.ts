export class Indicador {

    constructor(_id: string, id: string, description: string) {
        this._id = _id;
        this.id = id;
        this.descripcion = description;
    }
    _id: string;
    id:  string;
    descripcion: string;
}
