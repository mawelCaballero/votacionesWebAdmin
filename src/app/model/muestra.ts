import { Indicador } from './indicador';

export class Muestra {

    constructor(_id: string, id: string, description: string,
        categoria: string, img?: string,  indicadores?: string[]) {
        this._id = _id;
        this.id = id;
        this.img = img;
        this.descripcion = description;
        this.categoria = categoria;
        this.indicadores = indicadores;
    }
    _id: string;
    id:  string;
    descripcion: string;
    categoria: string;
    img: string;
    indicadores: string[];
}
