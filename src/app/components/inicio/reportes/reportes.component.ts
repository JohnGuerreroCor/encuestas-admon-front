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
      icono: 'fa-solid fa-chart-pie fa-6x text-center color-icon color-icon',
      info: 'Genera resultados en gráficos tabulados, como barras, porcentajes y de dona, facilitando el análisis visual de las respuestas.',
    },
    {
      titulo: 'Descargar Excel Agrupado',
      ruta: '/agrupados',
      icono: 'fa-solid fa-list-check fa-6x text-center color-icon',
      info: 'Facilita la descarga de reportes organizados por tipo de pregunta, presentando los datos de forma estructurada.',
    },
    {
      titulo: 'Resultados Históricos',
      ruta: '/historico',
      icono: 'fa-solid fa-chart-gantt fa-6x text-center color-icon',
      info: 'Ofrece la opción de descargar el reporte histórico de respuestas archivadas, permitiendo un análisis detallado de datos.',
    },
    {
      titulo: 'Inicio',
      ruta: '/inicio',
      icono: 'fa-solid fa-house fa-6x text-center color-icon',
      info: 'Permite regresar al menú anterior para facilitar la navegación entre opciones, asegurando una experiencia fluida.',
    },
  ];
}
