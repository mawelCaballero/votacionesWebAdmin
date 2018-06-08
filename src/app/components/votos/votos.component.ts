import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { VotosService } from '../../services/votos.service';
import { Router } from '@angular/router';
import { GrowlService } from 'ngx-growl';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { VotantesService } from '../../services/votantes.service';
import { MuestraService } from '../../services/muestra.service';
import { IndicadoresService } from '../../services/indicadores.service';
import { Voto } from '../../model/voto';

@Component({
  selector: 'app-votos',
  templateUrl: './votos.component.html',
  styleUrls: ['./votos.component.css']
})
export class VotosComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  votos = new MatTableDataSource();

  muestraSelected: any;

  votanteSelected: any;

  muestras: any[];

  votantes: any[];

  displayedColumns = ['votante', 'muestra', 'criterio', 'voto', 'detalle'];


  constructor(
    private votoService: VotosService,
    private votanteService: VotantesService,
    private muestraService: MuestraService,
    private indicadorService: IndicadoresService,
    private router: Router,
    private growlService: GrowlService) {
      this.muestraService.getItems().subscribe(response => {
        this.muestras = response;
    });


   this.votanteService.getItems().subscribe(response => {
      this.votantes = response;
  });
    }

  ngOnInit() {
    this.getVotos();
  }


  searchByCriteria() {

    let idVotante;
    let idMuestra;

    if (this.votanteSelected && this.votanteSelected._id) {
      idVotante = this.votanteSelected._id;
    }

    if (this.muestraSelected && this.muestraSelected._id) {
      idMuestra = this.muestraSelected._id;
    }

    this.votoService.getItemsByCriteria(idVotante, idMuestra).subscribe
    (
      response => {
        const elements = [];
        this.votos.data = [];
        response.forEach( (element) => {
             const allCalls =  forkJoin(
               this.votanteService.getItemById(element.idVotante),
               this.muestraService.getItemById(element.idMuestra),
               this.indicadorService.getItemById(element.idIndicador)
             ).map((data: any[]) => {
               return new Voto(element._id, data[0].user, data[1].descripcion,
                data[2].descripcion, element.valoracion);
             });
             allCalls.subscribe( rescurrentEp  => {
               const data = this.votos.data;
               data.push(rescurrentEp);
               this.votos.data = data;
               this.votos.paginator = this.paginator;
               this.votos.sort = this.sort;
              });
         });
       });
  }

  reset() {
    this.getVotos();
  }

  deleteVoto(_key: string) {
    this.votoService.deleteItem(_key).subscribe(response => {
      const elements = [];
        this.votos.data = [];
        this.getVotos();
       });

  }

  private getVotos() {
    this.votoService.getItems().subscribe(
      response => {
       const elements = [];
       this.votos.data = [];
       response.forEach( (element) => {
            const allCalls =  forkJoin(
              this.votanteService.getItemById(element.idVotante),
              this.muestraService.getItemById(element.idMuestra),
              this.indicadorService.getItemById(element.idIndicador)
            ).map((data: any[]) => {
 
              return new Voto(element._id, data[0].user, data[1].descripcion,
               data[2].descripcion, element.valoracion);
            });
            allCalls.subscribe( rescurrentEp  => {
              const data = this.votos.data;
              data.push(rescurrentEp);
              this.votos.data = data;
              this.votos.paginator = this.paginator;
              this.votos.sort = this.sort;
             });
        });
      });
  }
}
