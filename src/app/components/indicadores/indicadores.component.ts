import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IndicadoresService } from '../../services/indicadores.service';
import { Indicador } from '../../model/indicador';
import { MatSort, MatTableDataSource, MatTable, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { GrowlService } from 'ngx-growl';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns = ['id', 'descripcion', 'detalle'];

  indicadores;

  constructor(
    private indicadorService: IndicadoresService,
    private router: Router,
    private growlService: GrowlService ) {
      this.indicadores = new MatTableDataSource();
  }

  ngOnInit() {
    this.indicadorService.getItems().subscribe(
      response => {
        this.indicadores = new MatTableDataSource(response);
        this.indicadores.sort = this.sort;
        this.indicadores.paginator = this.paginator;
      },
      error => {
        this.growlService.addError({heading: 'Error.', message: 'Se ha producido un error al recuperar los indicadores'});

      });
  }

  ngAfterViewInit() {  }

  detail(indicadorId: string) {
    this.router.navigate(['/indicador/' + indicadorId]);
  }

  createNewIndicador() {
    this.router.navigate(['/indicador/']);
  }
}
