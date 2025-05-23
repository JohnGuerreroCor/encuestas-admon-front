import { Component } from '@angular/core';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
})
export class PreguntasComponent {
  links = [
    {
      titulo: 'Crear pregunta',
      ruta: '/pregunta',
      icono: 'fa-solid fa-circle-plus fa-6x text-center color-icon color-icon',
      info: 'Facilita la configuración de cada pregunta según su tipo, permitiendo opciones como selección múltiple o respuesta en texto.',
    },
    {
      titulo: 'Crear grupo',
      ruta: '/grupo-likert',
      icono: 'fa-solid fa-object-ungroup fa-6x text-center color-icon',
      info: 'Organiza y configura el conjunto de preguntas, permitiendo agruparlas según un criterio específico .',
    },
    {
      titulo: 'Escala likert',
      ruta: '/escala-likert',
      icono: 'fa-solid fa-sitemap fa-6x text-center color-icon',
      info: 'Permite crear encuestas con escala Likert, facilitando la evaluación de opiniones mediante distintos niveles.',
    },
    {
      titulo: 'Inicio',
      ruta: '/inicio',
      icono: 'fa-solid fa-house fa-6x text-center color-icon',
      info: 'Permite regresar al menú anterior para facilitar la navegación entre opciones, asegurando una experiencia fluida.',
    },
  ];
}
