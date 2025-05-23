import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import Swal from 'sweetalert2';
import { CuestionarioTabulado } from 'src/app/models/cuestionario-tabulado';

@Component({
  selector: 'app-restaurar',
  templateUrl: './restaurar.component.html',
  styleUrls: ['./restaurar.component.css'],
})
export class RestaurarComponent implements OnInit {
  dataSource = new MatTableDataSource<CuestionarioTabulado>([]);

  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'uaa',
    'fechaFin',
    'fechaInicio',
    'total',
    'restaurar',
  ];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private cuestionarioService: CuestionarioService,
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    if (this.auth.validacionToken()) {
      this.find();
    }
  }

  restaurar(cuestionarioCodigo: number, total:number) {
    Swal.fire({
      title: 'Está a punto de archivar '+ total +' respuestas del cuestionario',
      text: 'Una vez realizada esta acción, las respuestas actuales serán archivadas, solo podrán consultarse en los resultados históricos y no se podrá deshacer el cambio. ¿Deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00c053',
      cancelButtonColor: '#DC1919',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuestionarioService
          .restaurarCuestionario(cuestionarioCodigo)
          .subscribe(
            (data) => {
              if (data > 0) {
                Swal.fire({
                  icon: 'success',
                  title: '¡Operación realizada con éxito!',
                  confirmButtonColor: '#00c053',
                  confirmButtonText: 'Listo',
                });
                this.find();
              } else {
                this.mensajeError();
              }
            },
            (err) => this.fError(err)
          );
      }
    });
  }

  esFechaExpirada(fechaFin: string): boolean {
    const fechaFinDate = new Date(fechaFin); // Convertir el string a Date
    const fechaActual = new Date(); // Obtener la fecha actual
    return fechaActual > fechaFinDate; // Retorna true si la fecha actual es mayor
  }

  fError(er: any): void {
    let err = er.error.error_description;
    let arr: string[] = err.split(':');

    if (arr[0] == 'Access token expired') {
      this.auth.logout();
      this.router.navigate(['login']);
    } else {
      this.mensajeError();
    }
  }

  find() {
    this.cuestionarioService.cuestionarioTabulado().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<CuestionarioTabulado>(data);
        this.paginator.firstPage();
        this.dataSource.paginator = this.paginator;
      },
      (err) => this.fError(err)
    );
  }

  mensajeError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocurrio Un Error!',
    });
  }

  mensajeSuccses() {
    Swal.fire({
      icon: 'success',
      title: 'Proceso Realizado',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
