import {CdkTableModule} from '@angular/cdk/table';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {GrowlModule} from 'ngx-growl';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatOptionModule,
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { VotantesComponent } from './components/votantes/votantes.component';
import { VotosComponent } from './components/votos/votos.component';
import { IndicadorDetalleComponent } from './components/indicador-detalle/indicador-detalle.component';
import { MuestrasComponent } from './components/muestras/muestras.component';

import { IndicadoresService } from './services/indicadores.service';
import { MuestraService } from './services/muestra.service';
import { EmailService } from './services/email.service';
import { MuestraDetalleComponent } from './components/muestra-detalle/muestra-detalle.component';
import { VotantesService } from './services/votantes.service';
import { VotanteDetailComponent } from './components/votante-detail/votante-detail.component';
import { Votante } from './model/votante';
import { CategoriaMuestraComponent } from './components/categoria-muestra/categoria-muestra.component';
import { CategoriaVotanteComponent } from './components/categoria-votante/categoria-votante.component';
import { CategoriaVotanteDetalleComponent } from './components/categoria-votante-detalle/categoria-votante-detalle.component';
import { CategoriaMuestraDetalleComponent } from './components/categoria-muestra-detalle/categoria-muestra-detalle.component';
import { CategoriaMuestraService } from './services/categoria-muestra.service';
import { CategoriaVotanteService } from './services/categoria-votante.service';
import { VotosService } from './services/votos.service';

const appRoutes: Routes = [
  { path: 'indicadores', component: IndicadoresComponent },
  { path: 'indicador/:indicador', component: IndicadorDetalleComponent },
  { path: 'indicador', component: IndicadorDetalleComponent },
  { path: 'muestras', component: MuestrasComponent },
  { path: 'muestra/:muestra', component: MuestraDetalleComponent },
  { path: 'muestra', component: MuestraDetalleComponent},
  { path: 'votantes', component: VotantesComponent },
  { path: 'votante/:votante', component: VotanteDetailComponent },
  { path: 'votante', component: VotanteDetailComponent },
  { path: 'votos', component: VotosComponent },
  { path: 'categoriasMuestra', component: CategoriaMuestraComponent },
  { path: 'categoriasVotante', component: CategoriaVotanteComponent },
  { path: 'categoriaMuestra/:id', component: CategoriaMuestraDetalleComponent },
  { path: 'categoriaMuestra', component: CategoriaMuestraDetalleComponent },
  { path: 'categoriaVotante/:id', component: CategoriaVotanteDetalleComponent },
  { path: 'categoriaVotante', component: CategoriaVotanteDetalleComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IndicadoresComponent,
    VotantesComponent,
    VotosComponent,
    IndicadorDetalleComponent,
    MuestrasComponent,
    MuestraDetalleComponent,
    VotanteDetailComponent,
    CategoriaMuestraComponent,
    CategoriaVotanteComponent,
    CategoriaVotanteDetalleComponent,
    CategoriaMuestraDetalleComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    HttpModule,
    GrowlModule.forRoot({maxMessages: 10, displayTimeMs: 5000}),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [IndicadoresService, MuestraService, VotantesService,
    CategoriaMuestraService, CategoriaVotanteService, EmailService,
    VotosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
