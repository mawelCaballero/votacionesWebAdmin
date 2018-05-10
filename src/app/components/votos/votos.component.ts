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

  displayedColumns = ['votante', 'muestra', 'criterio', 'voto', 'detalle'];


  constructor(private votoService: VotosService,
    private votanteService: VotantesService,
    private muestraService: MuestraService,
    private indicadorService: IndicadoresService,
    private router: Router,
    private growlService: GrowlService,
    private changeDetectorRefs: ChangeDetectorRef) {

    }

  ngOnInit() {
    
    this.votoService.getItems().subscribe(
      response => {
        console.log('Respuesta');
        response.forEach( (element) => {
          console.log('current element', element);

          forkJoin(
            this.votanteService.getItemById(element.idVotante),
            this.muestraService.getItemById(element.idMuestra),
            this.indicadorService.getItemById(element.idIndicador)
          ).subscribe(([votanteResp, muestraResp, indicadorResp]) => {
            //  _votos.push(new Voto(element._id, votanteResp.descripcion, muestraResp.descripcion, 
            //  indicadorResp.descripcion, element.valoracion));
             this.votos.data.push(new Voto(element._id, votanteResp.descripcion, muestraResp.descripcion,
               indicadorResp.descripcion, element.valoracion));
              this.changeDetectorRefs.detectChanges();
          }
        );
        this.votos.paginator = this.paginator;
        this.votos.sort = this.sort;
      }

    );
  });

}
}
