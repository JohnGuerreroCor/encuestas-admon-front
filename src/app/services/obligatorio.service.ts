import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { WebParametro } from '../models/web-parametro';

@Injectable({
  providedIn: 'root',
})
export class ObligatorioService {
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  private url: string = `${environment.URL_BACKEND}/api/obligatorio`;

  uaa: number = this.authservice.obtenerUaa();
  userLogeado: String = this.authservice.user.username;
  role: any = this.authservice.user.roles;

  constructor(private http: HttpClient, private authservice: AuthService) {}

  private aggAutorizacionHeader(): HttpHeaders {
    let token = this.authservice.Token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  obtenerParametrosMatriculaPregrado(): Observable<WebParametro[]> {
    return this.http.get<WebParametro[]>(
      `${this.url}/parametros-matricula-pregrado`,
      {
        headers: this.aggAutorizacionHeader(),
      }
    );
  }

  obtenerParametrosSGD(): Observable<WebParametro[]> {
    return this.http.get<WebParametro[]>(`${this.url}/parametros-sgd`, {
      headers: this.aggAutorizacionHeader(),
    });
  }

  obtenerParametrosNotasPregrado(): Observable<WebParametro[]> {
    return this.http.get<WebParametro[]>(
      `${this.url}/parametros-notas-pregrado`,
      {
        headers: this.aggAutorizacionHeader(),
      }
    );
  }

  obtenerParametrosEvaluacionDocente(): Observable<WebParametro[]> {
    return this.http.get<WebParametro[]>(
      `${this.url}/parametros-evalauacion-docente`,
      {
        headers: this.aggAutorizacionHeader(),
      }
    );
  }

  actualizarParametroEncuestaMatriculaPregrado(
    webParametro: WebParametro
  ): Observable<number> {
    return this.http.put<number>(
      `${this.url}/actualizar-parametro-encuesta-matricula-pregrado/${this.userLogeado}`,
      webParametro,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  actualizarParametroEstadoMatriculaPregrado(
    webParametro: WebParametro
  ): Observable<number> {
    return this.http.put<number>(
      `${this.url}/actualizar-parametro-estado-matricula-pregrado/${this.userLogeado}`,
      webParametro,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  actualizarParametroEncuestaSGD(
    webParametro: WebParametro
  ): Observable<number> {
    return this.http.put<number>(
      `${this.url}/actualizar-parametro-encuesta-sgd/${this.userLogeado}`,
      webParametro,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  actualizarParametroEstadoSGD(webParametro: WebParametro): Observable<number> {
    return this.http.put<number>(
      `${this.url}/actualizar-parametro-estado-sgd/${this.userLogeado}`,
      webParametro,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  actualizarParametroEncuestaNotasPregrado(
    webParametro: WebParametro
  ): Observable<number> {
    return this.http.put<number>(
      `${this.url}/actualizar-parametro-encuesta-notas-pregrado/${this.userLogeado}`,
      webParametro,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  actualizarParametroEstadoNotasPregrado(
    webParametro: WebParametro
  ): Observable<number> {
    return this.http.put<number>(
      `${this.url}/actualizar-parametro-estado-notas-pregrado/${this.userLogeado}`,
      webParametro,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  actualizarParametroEncuestaEvaluacionDocente(
    webParametro: WebParametro
  ): Observable<number> {
    return this.http.put<number>(
      `${this.url}/actualizar-parametro-encuesta-evalauacion-docente/${this.userLogeado}`,
      webParametro,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  actualizarParametroEstadoEvaluacionDocente(
    webParametro: WebParametro
  ): Observable<number> {
    return this.http.put<number>(
      `${this.url}/actualizar-parametro-estado-evalauacion-docente/${this.userLogeado}`,
      webParametro,
      { headers: this.aggAutorizacionHeader() }
    );
  }
}
