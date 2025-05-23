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
            'fa-solid fa-circle-plus fa-6x text-center color-icon color-icon',
          info: 'La creación de un cuestionario incluye título, instrucciones, fechas de inicio y cierre y restricciones de tiempo.',
        },
        {
          titulo: 'Restaurar cuestionario',
          ruta: '/restaurar',
          icono: 'fa-solid fa-eraser fa-6x text-center color-icon color-icon',
          info: 'Guarda las respuestas de un cuestionario para reutilizar la encuesta, permitiendo evaluar a un nuevo público objetivo.',
        },
        {
          titulo: 'Obligatoriedad',
          ruta: '/obligatorio',
          icono: 'fa-solid fa-circle-exclamation fa-6x text-center color-icon',
          info: 'Indica que la encuesta es obligatoria, asegurando deben completarla antes de continuar o acceder a otras secciones.',
        },
        {
          titulo: 'Configurar acceso',
          ruta: '/configuracion',
          icono: 'fa-solid fa-sliders fa-6x text-center color-icon',
          info: 'Define qué usuarios pueden acceder y responder al cuestionario, asegurando que solo el público objetivo participe.',
        },
        {
          titulo: 'Previsualizar cuestionario',
          ruta: '/previsualizacion',
          icono: 'fa-solid fa-eye fa-6x text-center color-icon',
          info: 'Muestra los cuestionarios creados, permitiendo revisar detalles como título, fechas y configuración antes de su aplicación.',
        },
        {
          titulo: 'Inicio',
          ruta: '/inicio',
          icono: 'fa-solid fa-house fa-6x text-center color-icon',
          info: 'Permite regresar al menú anterior para facilitar la navegación entre opciones, asegurando una experiencia fluida.',
        },
      ];
    } else {
      this.links = [
        {
          titulo: 'Crear cuestionario',
          ruta: '/cuestionario',
          icono:
            'fa-solid fa-circle-plus fa-6x text-center color-icon color-icon',
          info: 'La creación de un cuestionario incluye título, instrucciones, fechas de inicio y cierre y restricciones de tiempo.',
        },
        {
          titulo: 'Restaurar cuestionario',
          ruta: '/restaurar',
          icono: 'fa-solid fa-eraser fa-6x text-center color-icon color-icon',
          info: 'Guarda las respuestas de un cuestionario para reutilizar la encuesta, permitiendo evaluar a un nuevo público objetivo.',
        },
        {
          titulo: 'Configurar acceso',
          ruta: '/configuracion',
          icono: 'fa-solid fa-sliders fa-6x text-center color-icon',
          info: 'Define qué usuarios pueden acceder y responder al cuestionario, asegurando que solo el público objetivo participe.',
        },
        {
          titulo: 'Previsualizar cuestionario',
          ruta: '/previsualizacion',
          icono: 'fa-solid fa-eye fa-6x text-center color-icon',
          info: 'Muestra los cuestionarios creados, permitiendo revisar detalles como título, fechas y configuración antes de su aplicación.',
        },
        {
          titulo: 'Inicio',
          ruta: '/inicio',
          icono: 'fa-solid fa-house fa-6x text-center color-icon',
          info: 'Permite regresar al menú anterior para facilitar la navegación entre opciones, asegurando una experiencia fluida.',
        },
      ];
    }
  }
}
