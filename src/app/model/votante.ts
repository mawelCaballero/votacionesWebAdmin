import { Muestra } from './muestra';

export class Votante {

    constructor(_id: string,
        id: string,
        user: string,
        pass: string,
        description: string,
        email: string,
        voto: boolean,
        tipo_votante: string,
        muestras?: string[]) {
            this._id = _id;
            this.id = id;
            this.descripcion = description;
            this.user = user;
            this.email = email;
            this.pass = pass;
            this.tipo_votante = tipo_votante;
            this.muestras = muestras;
    }
    _id: string;
    id:  string;
    user:  string;
    pass: string;
    descripcion: string;
    email: string;
    voto: boolean;
    tipo_votante: string;
    muestras: string[];
}
