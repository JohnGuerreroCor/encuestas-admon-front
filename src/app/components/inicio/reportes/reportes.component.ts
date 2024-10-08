import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent {
  links = [
    {
      titulo: 'Resultados',
      ruta: '/resultados',
      icono:
        'fa-solid fa-chart-pie fa-8x p-4 text-center color-icon color-icon',
      info: 'Permite obtener los resultados en gráficos tabulados (barras, porcentaje y de dona).',
    },
    {
      titulo: 'Descargar Excel Agrupado',
      ruta: '/agrupados',
      icono: 'fa-solid fa-list-check fa-8x p-4 text-center color-icon',
      info: 'Permite descargar el reporte por tipo de preguntas y de manera ordenada y agrupada.',
    },
    {
      titulo: 'Descargar Excel General',
      ruta: '/descargables',
      icono: 'fa-solid fa-file-csv fa-8x p-4 text-center color-icon',
      info: 'Permite descargar el reporte general, según el cuestionario aplicado.',
    },
    {
      titulo: 'Inicio',
      ruta: '/inicio',
      icono: 'fa-solid fa-house fa-8x p-4 text-center color-icon',
      info: 'Volver al menú anterior.',
    },
  ];
}
