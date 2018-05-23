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

  displayedColumns = ['votante', 'muestra', 'criterio', 'voto'];


  constructor(
    private votoService: VotosService,
    private router: Router,
    private growlService: GrowlService) {

    }

  ngOnInit() {
    this.votoService.getItems().subscribe(
      response => {
          this.votos.data = response;
          this.votos.paginator = this.paginator;
          this.votos.sort = this.sort;
      });

}
}
