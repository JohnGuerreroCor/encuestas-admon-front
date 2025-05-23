import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TokenComponent } from './components/token/token.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CuestionariosComponent } from './components/inicio/cuestionarios/cuestionarios.component';
import { PreguntasComponent } from './components/inicio/preguntas/preguntas.component';
import { ReportesComponent } from './components/inicio/reportes/reportes.component';
import { CuestionarioComponent } from './components/cuestionarios/cuestionario/cuestionario.component';
import { ConfiguracionComponent } from './components/cuestionarios/configuracion/configuracion.component';
import { PrevisualizacionComponent } from './components/cuestionarios/previsualizacion/previsualizacion.component';
import { RespuestaComponent } from './components/respuestas/respuesta/respuesta.component';
import { PreguntaComponent } from './components/preguntas/pregunta/pregunta.component';
import { EscalaLikertComponent } from './components/preguntas/escala-likert/escala-likert.component';
import { GrupoLikertComponent } from './components/preguntas/grupo-likert/grupo-likert.component';
import { ResultadosComponent } from './components/reportes/resultados/resultados.component';
import { DescargablesComponent } from './components/reportes/descargables/descargables.component';
import { RelacionPreguntaRespuestaComponent } from './components/relacion-pregunta-respuesta/relacion-pregunta-respuesta.component';
import { AgrupadoComponent } from './components/reportes/agrupado/agrupado.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './guard/auth.guard';
import { ObligatorioComponent } from './components/cuestionarios/obligatorio/obligatorio.component';
import { RestaurarComponent } from './components/cuestionarios/restaurar/restaurar.component';
import { HistoricoComponent } from './components/reportes/historico/historico.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'acceso-denegado', component: NotfoundComponent },

  { path: 'login', component: LoginComponent },
  { path: 'token', component: TokenComponent },

  { path: 'inicio', component: InicioComponent },

  {
    path: 'cuestionarios',
    component: CuestionariosComponent,
  },
  {
    path: 'restaurar',
    component: RestaurarComponent,
  },
  {
    path: 'obligatorio',
    component: ObligatorioComponent,
  },
  {
    path: 'cuestionario',
    component: CuestionarioComponent,
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent,
  },
  {
    path: 'previsualizacion',
    component: PrevisualizacionComponent,
  },

  {
    path: 'preguntas',
    component: PreguntasComponent,
  },
  { path: 'pregunta', component: PreguntaComponent },
  {
    path: 'escala-likert',
    component: EscalaLikertComponent,
  },
  {
    path: 'grupo-likert',
    component: GrupoLikertComponent,
  },

  {
    path: 'respuesta',
    component: RespuestaComponent,
  },

  {
    path: 'relacion-pregunta-respuesta',
    component: RelacionPreguntaRespuestaComponent,
  },

  { path: 'reportes', component: ReportesComponent },
  {
    path: 'resultados',
    component: ResultadosComponent,
  },
  {
    path: 'historico',
    component: HistoricoComponent,
  },
  {
    path: 'descargables',
    component: DescargablesComponent,
  },
  { path: 'agrupados', component: AgrupadoComponent },

  { path: '**', redirectTo: 'acceso-denegado' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
