export class Voto {

    constructor(_id: string,
        idVotante: string,
        idMuestra: string,
        idIndicador: string,
        valoracion: number) {
            this._id = _id;
            this.idVotante = idVotante;
            this.idMuestra = idMuestra;
            this.idIndicador = idIndicador;
            this.valoracion = valoracion;
    }
    _id: string;
    idVotante:  string;
    idMuestra:  string;
    idIndicador: string;
    valoracion: number;
}
