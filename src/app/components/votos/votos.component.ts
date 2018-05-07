import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { VotosService } from '../../services/votos.service';

@Component({
  selector: 'app-votos',
  templateUrl: './votos.component.html',
  styleUrls: ['./votos.component.css']
})
export class VotosComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['id', 'usuario', 'muestra', 'criterio', 'voto', 'detalle'];


  constructor(private votoService: VotosService) { }

  ngOnInit() {
  }

}
