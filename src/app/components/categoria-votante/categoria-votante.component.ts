import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CategoriaVotanteService } from '../../services/categoria-votante.service';
import { Categoria } from '../../model/categoria';
import { MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { Router } from '@angular/router';
import { GrowlService } from 'ngx-growl';

@Component({
  selector: 'app-categoria-votante',
  templateUrl: './categoria-votante.component.html',
  styleUrls: ['./categoria-votante.component.scss']
})
export class CategoriaVotanteComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;


  displayedColumns = ['id', 'descripcion', 'detalle'];

  categorias;

  constructor(private categoriaVotanteService: CategoriaVotanteService, 
    private router: Router,
    private growlService: GrowlService ) {
    this.categorias = new MatTableDataSource();
  }

  ngOnInit() {
    this.categoriaVotanteService.getItems().subscribe(
      response => {
        this.categorias = new MatTableDataSource(response);
        this.categorias.sort = this.sort;
      },
      error => {
        this.growlService.addError({heading: 'Error.', message: 'Se ha producido un error al recuperar las categorias'});

      });
  }

  ngAfterViewInit() {  }

  detail(categoriaId: string) {
    this.router.navigate(['/categoriaVotante/' + categoriaId]);
  }

  createNewCategoria() {
    this.router.navigate(['/categoriaVotante/']);
  }

}
