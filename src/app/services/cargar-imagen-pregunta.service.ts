import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root',
})
export class CargarImagenPreguntaService {
  private url: string = `${environment.URL_BACKEND}/api/pregunta`;
  private httpHeaders = new HttpHeaders();

  userLogeado: String = this.authservice.user.username;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authservice: AuthService
  ) {}

  private aggAutorizacionHeader(): HttpHeaders {
    let token = this.authservice.Token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e: any): boolean {
    if (e.status == 401 || e.status == 403) {
      if (this.authservice.isAuthenticated()) {
        this.authservice.logout();
      }
      this.router.navigate(['login']);
      return true;
    }
    return false;
  }

  registrarPregunta(archivo: File, json: Pregunta): Observable<null> {
    let formData: FormData = new FormData();
    formData.set('archivo', archivo);
    formData.set('json', JSON.stringify(json));
    return this.http.post<null>(
      `${this.url}/subir-imagen-pregunta/${this.userLogeado}/${this.authservice.user.personaCodigo}/${this.authservice.user.uaaCodigo}`,
      formData,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  mirarSoporte(codigo: number): Observable<any> {
    return this.http.get<any>(
      `${this.url}/mirar-imagen/${codigo}/${this.userLogeado}`,
      { headers: this.aggAutorizacionHeader(), responseType: 'blob' as 'json' }
    );
  }
}
