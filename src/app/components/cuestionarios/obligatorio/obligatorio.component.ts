import { ObligatorioService } from './../../../services/obligatorio.service';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { Uaa } from 'src/app/models/uaa';
import { UaaTipo } from 'src/app/models/uaa-tipo';
import { AuthService } from 'src/app/services/auth.service';
import { UaaService } from 'src/app/services/uaa.service';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import Swal from 'sweetalert2';
import { WebParametro } from 'src/app/models/web-parametro';

@Component({
  selector: 'app-obligatorio',
  templateUrl: './obligatorio.component.html',
  styleUrls: ['./obligatorio.component.css'],
})
export class ObligatorioComponent {
  editar: boolean = false;

  formularioMatricula!: FormGroup;
  formularioSGD!: FormGroup;
  formularioNotasPregrado!: FormGroup;
  formularioEvaluacionDocente!: FormGroup;

  lstCuestionarios: Cuestionario[] = [];
  lstWebParametrosMatricula: WebParametro[] = [];
  lstWebParametrosSgd: WebParametro[] = [];
  lstWebParametrosNotasPregrado: WebParametro[] = [];
  lstWebParametrosEvaluacionDocente: WebParametro[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private cuestionarioService: CuestionarioService,
    private obligatorioService: ObligatorioService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.auth.validacionToken()) {
      this.formularioModuloMatriculaPregrado();
      this.formularioModuloSGD();
      this.formularioModuloNotasPregrado();
      this.formularioModuloEvaluacionDocente();
      this.parametrosMatricula();
      this.parametrosSGD();
      this.parametrosNotasPregrado();
      this.parametrosEvaluacionDocente();
      this.find();
    }
  }

  parametrosMatricula() {
    this.obligatorioService
      .obtenerParametrosMatriculaPregrado()
      .subscribe((data) => {
        this.lstWebParametrosMatricula = data;
        console.log(this.lstWebParametrosMatricula);
        this.formularioMatricula
          .get('encuesta1')!
          .setValue(+this.lstWebParametrosMatricula[1].webValor);
        console.log(JSON.stringify(this.lstWebParametrosMatricula[0].webValor));
        if (this.lstWebParametrosMatricula[0].webValor === '1') {
          this.formularioMatricula.get('estado1')!.setValue(true);
        } else {
          this.formularioMatricula.get('estado1')!.setValue(false);
        }
      });
  }

  parametrosSGD() {
    this.obligatorioService.obtenerParametrosSGD().subscribe((data) => {
      this.lstWebParametrosSgd = data;
      console.log(this.lstWebParametrosSgd);
      this.formularioSGD
        .get('encuesta2')!
        .setValue(+this.lstWebParametrosSgd[1].webValor);
      if (this.lstWebParametrosSgd[0].webValor === '1') {
        this.formularioSGD.get('estado2')!.setValue(true);
      } else {
        this.formularioSGD.get('estado2')!.setValue(false);
      }
    });
  }

  parametrosNotasPregrado() {
    this.obligatorioService
      .obtenerParametrosNotasPregrado()
      .subscribe((data) => {
        this.lstWebParametrosNotasPregrado = data;
        console.log(this.lstWebParametrosNotasPregrado);
        this.formularioNotasPregrado
          .get('encuesta3')!
          .setValue(+this.lstWebParametrosNotasPregrado[1].webValor);

        if (this.lstWebParametrosNotasPregrado[0].webValor === '1') {
          this.formularioNotasPregrado.get('estado3')!.setValue(true);
        } else {
          this.formularioNotasPregrado.get('estado3')!.setValue(false);
        }
      });
  }

  parametrosEvaluacionDocente() {
    this.obligatorioService
      .obtenerParametrosEvaluacionDocente()
      .subscribe((data) => {
        this.lstWebParametrosEvaluacionDocente = data;
        console.log(this.lstWebParametrosEvaluacionDocente);
        this.formularioEvaluacionDocente
          .get('encuesta4')!
          .setValue(+this.lstWebParametrosEvaluacionDocente[1].webValor);

        if (this.lstWebParametrosEvaluacionDocente[0].webValor === '1') {
          this.formularioEvaluacionDocente.get('estado4')!.setValue(true);
        } else {
          this.formularioEvaluacionDocente.get('estado4')!.setValue(false);
        }
      });
  }

  find() {
    this.cuestionarioService.find().subscribe(
      (data) => {
        this.lstCuestionarios = data;
      },
      (err) => this.fError(err)
    );
  }

  private formularioModuloMatriculaPregrado(): void {
    this.formularioMatricula = this.formBuilder.group({
      encuesta1: new FormControl('', Validators.required),
      estado1: new FormControl('', Validators.required),
    });
  }

  private formularioModuloSGD(): void {
    this.formularioSGD = this.formBuilder.group({
      encuesta2: new FormControl('', Validators.required),
      estado2: new FormControl('', Validators.required),
    });
  }

  private formularioModuloNotasPregrado(): void {
    this.formularioNotasPregrado = this.formBuilder.group({
      encuesta3: new FormControl('', Validators.required),
      estado3: new FormControl('', Validators.required),
    });
  }

  private formularioModuloEvaluacionDocente(): void {
    this.formularioEvaluacionDocente = this.formBuilder.group({
      encuesta4: new FormControl('', Validators.required),
      estado4: new FormControl('', Validators.required),
    });
  }

  resgistrarParametrosMatriculaPregrado() {
    this.lstWebParametrosMatricula[1].webValor =
      this.formularioMatricula.get('encuesta1')!.value;
    if (this.formularioMatricula.get('estado1')!.value == true) {
      this.lstWebParametrosMatricula[0].webValor = '1';
    } else {
      this.lstWebParametrosMatricula[0].webValor = '0';
    }
    this.obligatorioService
      .actualizarParametroEncuestaMatriculaPregrado(
        this.lstWebParametrosMatricula[1]
      )
      .subscribe(
        (data) => {
          if (data > 0) {
            this.mensajeSuccses();
          } else {
            this.mensajeError();
          }
        },
        (err) => this.fError(err)
      );
    this.obligatorioService
      .actualizarParametroEstadoMatriculaPregrado(
        this.lstWebParametrosMatricula[0]
      )
      .subscribe(
        (data) => {
          if (data > 0) {
            this.mensajeSuccses();
            this.parametrosMatricula();
          } else {
            this.mensajeError();
          }
        },
        (err) => this.fError(err)
      );
  }

  resgistrarParametrosSGD() {
    this.lstWebParametrosSgd[1].webValor =
      this.formularioSGD.get('encuesta2')!.value;
    if (this.formularioSGD.get('estado2')!.value == true) {
      this.lstWebParametrosSgd[0].webValor = '1';
    } else {
      this.lstWebParametrosSgd[0].webValor = '0';
    }
    this.obligatorioService
      .actualizarParametroEncuestaSGD(this.lstWebParametrosSgd[1])
      .subscribe(
        (data) => {
          if (data > 0) {
            this.mensajeSuccses();
          } else {
            this.mensajeError();
          }
        },
        (err) => this.fError(err)
      );
    this.obligatorioService
      .actualizarParametroEstadoSGD(this.lstWebParametrosSgd[0])
      .subscribe(
        (data) => {
          if (data > 0) {
            this.mensajeSuccses();
            this.parametrosSGD();
          } else {
            this.mensajeError();
          }
        },
        (err) => this.fError(err)
      );
  }

  resgistrarParametrosNotasPregrado() {
    this.lstWebParametrosNotasPregrado[1].webValor =
      this.formularioNotasPregrado.get('encuesta3')!.value;
    if (this.formularioNotasPregrado.get('estado3')!.value == true) {
      this.lstWebParametrosNotasPregrado[0].webValor = '1';
    } else {
      this.lstWebParametrosNotasPregrado[0].webValor = '0';
    }
    this.obligatorioService
      .actualizarParametroEncuestaNotasPregrado(
        this.lstWebParametrosNotasPregrado[1]
      )
      .subscribe(
        (data) => {
          if (data > 0) {
            this.mensajeSuccses();
          } else {
            this.mensajeError();
          }
        },
        (err) => this.fError(err)
      );
    this.obligatorioService
      .actualizarParametroEstadoNotasPregrado(
        this.lstWebParametrosNotasPregrado[0]
      )
      .subscribe(
        (data) => {
          if (data > 0) {
            this.mensajeSuccses();
            this.parametrosNotasPregrado();
          } else {
            this.mensajeError();
          }
        },
        (err) => this.fError(err)
      );
  }

  resgistrarParametrosEvaluacionDocente() {
    this.lstWebParametrosEvaluacionDocente[1].webValor =
      this.formularioEvaluacionDocente.get('encuesta4')!.value;
    if (this.formularioEvaluacionDocente.get('estado4')!.value == true) {
      this.lstWebParametrosEvaluacionDocente[0].webValor = '1';
    } else {
      this.lstWebParametrosEvaluacionDocente[0].webValor = '0';
    }
    this.obligatorioService
      .actualizarParametroEncuestaEvaluacionDocente(
        this.lstWebParametrosEvaluacionDocente[1]
      )
      .subscribe(
        (data) => {
          if (data > 0) {
            this.mensajeSuccses();
          } else {
            this.mensajeError();
          }
        },
        (err) => this.fError(err)
      );
    this.obligatorioService
      .actualizarParametroEstadoEvaluacionDocente(
        this.lstWebParametrosEvaluacionDocente[0]
      )
      .subscribe(
        (data) => {
          if (data > 0) {
            this.mensajeSuccses();
            this.parametrosEvaluacionDocente();
          } else {
            this.mensajeError();
          }
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
}
