import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css'],
})
export class CuestionariosComponent {
  role: any = this.auth.user.roles;
  links: any;
  constructor(public auth: AuthService) {
    if (this.role[0] == 'ROLE_ENCUESTAS_SUPER_ADMINISTRADOR') {
      this.links = [
        {
          titulo: 'Crear cuestionario',
          ruta: '/cuestionario',
          icono:
            'fa-solid fa-circle-plus fa-8x p-4 text-center color-icon color-icon',
          info: 'Creación de cuestionario, con sus respectivas fechas de inicio y cierre.',
        },
        {
          titulo: 'Obligatoriedad',
          ruta: '/obligatorio',
          icono:
            'fa-solid fa-circle-exclamation fa-8x p-4 text-center color-icon',
          info: 'Creación de cuestionario, con sus respectivas fechas de inicio y cierre.',
        },
        {
          titulo: 'Configurar acceso',
          ruta: '/configuracion',
          icono: 'fa-solid fa-sliders fa-8x p-4 text-center color-icon',
          info: 'Permite establecer qué usuarios pueden responder al cuestionario.',
        },
        {
          titulo: 'Previsualizar cuestionario',
          ruta: '/previsualizacion',
          icono: 'fa-solid fa-eye fa-8x p-4 text-center color-icon',
          info: 'Permite visualizar los cuestionarios ya creados.',
        },
        {
          titulo: 'Inicio',
          ruta: '/inicio',
          icono: 'fa-solid fa-house fa-8x p-4 text-center color-icon',
          info: 'Volver al menú anterior.',
        },
      ];
    } else {
      this.links = [
        {
          titulo: 'Crear cuestionario',
          ruta: '/cuestionario',
          icono:
            'fa-solid fa-circle-plus fa-8x p-4 text-center color-icon color-icon',
          info: 'Creación de cuestionario, con sus respectivas fechas de inicio y cierre.',
        },
        {
          titulo: 'Configurar acceso',
          ruta: '/configuracion',
          icono: 'fa-solid fa-sliders fa-8x p-4 text-center color-icon',
          info: 'Permite establecer qué usuarios pueden responder al cuestionario.',
        },
        {
          titulo: 'Previsualizar cuestionario',
          ruta: '/previsualizacion',
          icono: 'fa-solid fa-eye fa-8x p-4 text-center color-icon',
          info: 'Permite visualizar los cuestionarios ya creados.',
        },
        {
          titulo: 'Inicio',
          ruta: '/inicio',
          icono: 'fa-solid fa-house fa-8x p-4 text-center color-icon',
          info: 'Volver al menú anterior.',
        },
      ];
    }
  }
}
