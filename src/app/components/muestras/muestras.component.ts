import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Muestra } from '../../model/muestra';
import { MuestraService } from '../../services/muestra.service';
import { Router } from '@angular/router';
import { CategoriaMuestraService } from '../../services/categoria-muestra.service';

@Component({
  selector: 'app-muestras',
  templateUrl: './muestras.component.html',
  styleUrls: ['./muestras.component.scss']
})
export class MuestrasComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['id', 'descripcion', 'categoria', 'img', 'detalle'];


  muestras;

  constructor(private muestraService: MuestraService,
    private categoriaMuestraService: CategoriaMuestraService,
    private router: Router ) {
    this.muestras = new MatTableDataSource();
  }

  ngOnInit() {
    this.muestraService.getItems().subscribe(response => {
      const muestrasCol = new Array();
      response.forEach(element => {
        if (element) {
          this.categoriaMuestraService.getItemById(element.categoria).subscribe(
            categoriaResp => {
              element.categoria = categoriaResp.descripcion;
            }
          );
          muestrasCol.push(element);
        }
      });

      this.muestras = new MatTableDataSource(muestrasCol);
      this.muestras.paginator = this.paginator;
      this.muestras.sort = this.sort;
    });

  }
  detail(muestraId: string) {
      this.router.navigate(['/muestra/' + muestraId]);
  }
  createNewMuestra() {
      this.router.navigate(['/muestra/']);
  }

  deleteMuestra(_key: string) {
    this.muestraService.deleteItem(_key).subscribe(response => {
      this.muestras = new MatTableDataSource(response);
    });

  }
}
