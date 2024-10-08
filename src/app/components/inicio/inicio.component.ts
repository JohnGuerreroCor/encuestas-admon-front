import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  links = [
    {
      titulo: 'Cuestionarios',
      ruta: '/cuestionarios',
      icono:
        'fa-solid fa-file-lines fa-8x p-4 text-center color-icon color-icon',
      info: 'Crear cuestionario, configura el acceso a usuarios y parametriza la fecha de inicio y cierre del mismo.',
    },
    {
      titulo: 'Preguntas',
      ruta: '/preguntas',
      icono:
        'fa-solid fa-file-circle-question fa-8x p-4 text-center color-icon',
      info: 'Creación de preguntas de seleccion, escala likert y parametrización de la misma.',
    },
    {
      titulo: 'Respuestas',
      ruta: '/respuesta',
      icono: 'fa-solid fa-file-pen fa-8x p-4 text-center color-icon',
      info: 'Creación de respuestas según las opciones para cada ítem establecido.',
    },
    {
      titulo: 'Relación pregunta y respuesta',
      ruta: '/relacion-pregunta-respuesta',
      icono: 'fa-solid fa-diagram-project fa-8x p-4 text-center color-icon',
      info: 'Relaciona todas las repsuesta que puede tener un ítem de selección multipel con única respuesta.',
    },
    {
      titulo: 'Reportes',
      ruta: '/reportes',
      icono: 'fa-solid fa-chart-simple fa-8x p-4 text-center color-icon',
      info: 'Relaciona todas las repsuesta que puede tener un ítem de selección multipel con única respuesta.',
    },
  ];
}
