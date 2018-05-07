import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Votante } from '../../model/votante';
import { VotantesService } from '../../services/votantes.service';
import { Router } from '@angular/router';
import { EmailService } from '../../services/email.service';
import { GrowlService } from 'ngx-growl';


@Component({
  selector: 'app-votantes',
  templateUrl: './votantes.component.html',
  styleUrls: ['./votantes.component.css']
})
export class VotantesComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['id', 'user', 'email', 'descripcion', 'voto', 'tipo_votante', 'detalle'];


  votantes = new MatTableDataSource();

  constructor(private votanteService: VotantesService,
    private emailService: EmailService,
    private router: Router,
    private growlService: GrowlService) {
      this.votantes = new MatTableDataSource();
  }

  ngOnInit() {
    this.votanteService.getItems().subscribe(response => {
      this.votantes.data = response;
      this.votantes.paginator = this.paginator;
      this.votantes.sort = this.sort;
    });

  }
  detail(muestraId: string) {
      this.router.navigate(['/votante/' + muestraId]);
  }
  createNewMuestra() {
      this.router.navigate(['/votante/']);
  }

  deleteVotante(_key: string) {
    this.votanteService.deleteItem(_key).subscribe(response => {
      this.votantes = new MatTableDataSource(response);
    });

  }

  sendEmail(row: any) {
    console.log(row);
      this.emailService.sendEmail(
        { 'text': '<p> Esta es una invitación para poder votar en la copa Weedkend 2018</p>.' +
        '<p>Recuerda estos datos a la hora de acceder a la app.</p>' +
         '<p>Recuerda que solo puedes votar una única vez.</p> ' +
         '<p><ul><li>User: ' + row.user + '</li>' +
         '<li>Password: ' + row.pass + '</li></ul></p>'  ,
          'to': 'info@mawel.name',
          'subject': 'Weedkend invitacion'}).subscribe(
            response => {
              this.growlService.addSuccess('Se ha enviado la invitacion de forma correcta');
            },
            error => {
              this.growlService.addError(error);
            }
          );
        }
}
