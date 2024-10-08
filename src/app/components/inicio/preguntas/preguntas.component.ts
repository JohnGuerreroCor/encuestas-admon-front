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
      icono:
        'fa-solid fa-circle-plus fa-8x p-4 text-center color-icon color-icon',
      info: 'Permite parametrizar cada una de las preguntas según su tipo (selección multiple o texto).',
    },
    {
      titulo: 'Crear grupo',
      ruta: '/grupo-likert',
      icono: 'fa-solid fa-object-ungroup fa-8x p-4 text-center color-icon',
      info: 'Parametriza el conjunto de preguntas y las agrupa por un criterio específico.',
    },
    {
      titulo: 'Escala likert',
      ruta: '/escala-likert',
      icono: 'fa-solid fa-sitemap fa-8x p-4 text-center color-icon',
      info: 'Permite establecer qué usuarios pueden responder al cuestionario.',
    },
    {
      titulo: 'Inicio',
      ruta: '/inicio',
      icono: 'fa-solid fa-house fa-8x p-4 text-center color-icon',
      info: 'Volver al menú anterior.',
    },
  ];
}
