import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CategoriaMuestraService } from '../../services/categoria-muestra.service';
import { Categoria } from '../../model/categoria';
import { MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { Router } from '@angular/router';
import { GrowlService } from 'ngx-growl';

@Component({
  selector: 'app-categoria-muestra',
  templateUrl: './categoria-muestra.component.html',
  styleUrls: ['./categoria-muestra.component.scss']
})
export class CategoriaMuestraComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;


  displayedColumns = ['id', 'descripcion', 'detalle'];

  categorias;

  constructor(private categoriaMuestraService: CategoriaMuestraService, 
    private router: Router,
    private growlService: GrowlService ) {
    this.categorias = new MatTableDataSource();
  }

  ngOnInit() {
    this.categoriaMuestraService.getItems().subscribe(
      response => {
        this.categorias = new MatTableDataSource(response);
        this.categorias.sort = this.sort;
      },
      error => {
        this.growlService.addError({heading: 'Error.', message: 'Se ha producido un error al recuperar las categorias'});

      }
    );
  }

  ngAfterViewInit() {  }

  detail(categoriaId: string) {
    this.router.navigate(['/categoriaMuestra/' + categoriaId]);
  }

  createNewCategoria() {
    this.router.navigate(['/categoriaMuestra/']);
  }

}
