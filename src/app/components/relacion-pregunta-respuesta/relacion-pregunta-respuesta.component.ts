import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Cuestionario } from 'src/app/models/cuestionario';
import { Pregunta } from 'src/app/models/pregunta';
import { PreguntaRespuestas } from 'src/app/models/pregunta-respuestas';
import { RespuestaOpciones } from 'src/app/models/respuesta-opciones';
import { TipoRespuesta } from 'src/app/models/tipo-respuesta';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { PreguntaRespuestaService } from 'src/app/services/pregunta-respuesta.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { RespuestaOpcionesService } from 'src/app/services/respuesta-opciones.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Escala } from 'src/app/models/escala';
import { CuestionarioConfiguracion } from 'src/app/models/cuestionario-configuracion';
import { EscalaService } from 'src/app/services/escala.service';
import { CuestionarioConfiguracionService } from 'src/app/services/cuestionario-configuracion.service';
import { CargarImagenPreguntaService } from 'src/app/services/cargar-imagen-pregunta.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-relacion-pregunta-respuesta',
  templateUrl: './relacion-pregunta-respuesta.component.html',
  styleUrls: ['./relacion-pregunta-respuesta.component.css'],
})
export class RelacionPreguntaRespuestaComponent implements OnInit {
  editar2: boolean = false;

  lstCuestionario!: Cuestionario[];
  lstPregunta!: Pregunta[];
  lstRespuesta!: RespuestaOpciones[];

  flag: boolean = false;

  editar: boolean = false;

  form!: FormGroup;
  form2!: FormGroup;
  validador: boolean = false;

  dataSource = new MatTableDataSource<PreguntaRespuestas>([]);

  displayedColumns: string[] = ['codigo', 'pre', 'rop', 'editar'];

  /* displayedColumns: string[] = [
    'codigo',
    'descripcion',
    'rop',
    'pre',
    'depende',
    'tre',
    'editar',
    'agg',
  ]; */

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  constructor(
    private prService: PreguntaRespuestaService,
    private cueService: CuestionarioService,
    private fb: FormBuilder,
    private preService: PreguntaService,
    private reService: RespuestaOpcionesService,
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private cargarImagenPreguntaService: CargarImagenPreguntaService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalVistaPreviaRelacion, {
      data: this.form2.get('cue')!.value,
    });
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  scroll(page: HTMLElement) {
    page.scrollIntoView();
  }

  ngOnInit() {
    if (this.auth.validacionToken()) {
      this.findCuestionarios();
      this.initForm();
    }
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

  up() {
    window.scroll(0, 0);
  }

  findCuestionarios() {
    this.cueService.find().subscribe(
      (data) => {
        this.lstCuestionario = data;
      },
      (err) => this.fError(err)
    );
  }

  obtenerImagen(item: number) {
    this.cargarImagenPreguntaService.mirarSoporte(item).subscribe((data) => {
      var blob = new Blob([data], { type: 'image/png' });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        return reader.result as string;
      };
    });
  }

  find() {
    this.prService.findbyCuestionario(this.form2.get('cue')!.value).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<PreguntaRespuestas>(data);

        this.paginator.firstPage();

        this.dataSource.paginator = this.paginator;
      },
      (err) => this.fError(err)
    );
    this.reService.find().subscribe(
      (data) => {
        this.lstRespuesta = data;
      },
      (err) => this.fError(err)
    );
  }

  esSoloNumeros(descripcion: string): boolean {
    return /^\d+$/.test(descripcion);
  }

  findPreguntas() {
    this.preService.findbyCuestAndRYS(this.form2.get('cue')!.value).subscribe(
      (data) => {
        this.lstPregunta = data;
      },
      (err) => this.fError(err)
    );
  }

  private initForm(): void {
    this.form2 = this.fb.group({
      cue: new FormControl(''),
    });
    this.form = this.fb.group({
      pre: new FormControl('', Validators.required),
      re: new FormControl(''),
      descripcion: new FormControl(''),
      codigo: new FormControl(''),
      depende: new FormControl(''),
      tre: new FormControl(''),
    });
  }

  mostrar() {
    this.find();
    this.findPreguntas();
    this.flag = true;
  }

  onEliminar() {
    let codigo = this.form.get('codigo')!.value;
    this.prService.delete(codigo).subscribe(
      (data) => {
        if (data > 0) {
          this.mensajeSuccses();
          this.find();
          this.onCancelar();
        } else {
          this.mensajeError();
        }
      },
      (err) => this.fError(err)
    );
  }

  ontre() {
    this.preService.findbyCodigo(this.form.get('pre')!.value).subscribe(
      (data) => {
        this.form.get('tre')!.setValue(data.tipoRespuesta.codigo);
      },
      (err) => this.fError(err)
    );
  }

  onCrear(): void {
    let pre: Pregunta = new Pregunta();
    pre.codigo = this.form.get('pre')!.value;

    let tre: TipoRespuesta = new TipoRespuesta();
    tre.codigo = this.form.get('tre')!.value;

    let rop: RespuestaOpciones = new RespuestaOpciones();
    rop.codigo = this.form.get('re')!.value;

    let prr: PreguntaRespuestas = new PreguntaRespuestas();
    prr.codigo = this.form.get('codigo')!.value;
    prr.depende = this.form.get('depende')!.value;
    prr.descripcionAdicional = this.form.get('descripcion')!.value;

    prr.pregunta = pre;
    prr.respuestaOpciones = rop;
    prr.tipoRespuestas = tre;

    if (!this.editar) {
      this.resgistrar(prr);

      this.onCancelar();
      this.find();
    } else {
      this.actualizar(prr);
      this.onCancelar();
      this.find();
    }
  }

  actualizar(prr: PreguntaRespuestas) {
    this.prService.update(prr).subscribe(
      (data) => {
        if (data > 0) {
          this.mensajeSuccses();
          this.find();
          this.onCancelar();
        } else {
          this.mensajeError();
        }
      },
      (err) => this.fError(err)
    );
  }

  resgistrar(prr: PreguntaRespuestas) {
    this.prService.create(prr).subscribe(
      (data) => {
        if (data > 0) {
          this.mensajeSuccses();
          this.find();
          this.onCancelar();
        } else {
          this.mensajeError();
        }
      },
      (err) => this.fError(err)
    );
  }

  onCancelar() {
    this.form.reset();
    this.editar = false;
    this.editar2 = false;
    this.form.get('depende')!.clearValidators();
    this.form.get('descripcion')!.clearValidators();
    this.form.get('descripcion')!.updateValueAndValidity();
    this.form.get('depende')!.updateValueAndValidity();
  }

  onEditarClick(element: PreguntaRespuestas) {
    this.up();
    this.editar = true;
    this.form.get('codigo')!.setValue(element.codigo);

    this.preService.findbyCodigo(element.pregunta.codigo).subscribe(
      (data) => {
        this.form.get('tre')!.setValue(data.tipoRespuesta.codigo);
      },
      (err) => this.fError(err)
    );

    this.form.get('pre')!.setValue(element.pregunta.codigo);
    this.form.get('re')!.setValue(element.respuestaOpciones.codigo);
  }

  onEditaragregar(element: PreguntaRespuestas) {
    this.editar2 = true;
    this.editar = true;
    this.form.get('depende')!.setValue(element.depende);
    this.form.get('descripcion')!.setValue(element.descripcionAdicional);
    this.onEditarClick(element);
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

//MODAL
@Component({
  selector: 'modal-vista-previa-relacion',
  templateUrl: 'modal-vista-previa-relacion.component.html',
  styleUrls: ['./relacion-pregunta-respuesta.component.css'],
})
export class ModalVistaPreviaRelacion {
  lstOpciones: Array<PreguntaRespuestas[]> = new Array();
  lstPreguntass!: Pregunta[];
  lstCuestionarios!: Cuestionario[];
  form!: FormGroup;
  flag: boolean = false;
  titulo!: string;
  instrucciones!: string;
  dirigido!: string;
  lstRespuestas: Array<PreguntaRespuestas[]> = new Array();
  contador: number = 0;
  lstEscala: Array<Escala[]> = new Array();
  lstSubPreguntas: Array<Pregunta[]> = new Array();
  lstConfig!: CuestionarioConfiguracion[];
  validador: boolean = false;
  foto = {
    url: '',
  };
  fotos: string[] = [];

  constructor(
    private cuestionarioService: CuestionarioService,
    private fb: FormBuilder,
    private preguntaService: PreguntaService,
    private escalaService: EscalaService,
    private cuaService: CuestionarioConfiguracionService,
    private prService: PreguntaRespuestaService,
    private auth: AuthService,
    private router: Router,
    private cargarImagenPreguntaService: CargarImagenPreguntaService,
    public dialogRef: MatDialogRef<ModalVistaPreviaRelacion>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    console.log(this.data);

    this.onMostrar();
  }

  ngOnInit() {
    if (this.auth.validacionToken()) {
      this.initForm();
      this.findCuestionarios();
    }
  }

  fError(er: any): void {
    let err = er.error.error_description;
    let arr: string[] = err.split(':');

    if (arr[0] == 'Access token expired') {
      this.auth.logout();
      this.router.navigate(['login']);
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      codigo: new FormControl('', Validators.required),
    });
  }

  esSoloNumeros(descripcion: string): boolean {
    return /^\d+$/.test(descripcion);
  }

  obtenerImagen(item: number, index: number) {
    this.cargarImagenPreguntaService.mirarSoporte(item).subscribe((data) => {
      var blob = new Blob([data], { type: 'image/png' });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        this.fotos[index] = reader.result as string;
      };
    });
  }

  findCuestionarios() {
    this.cuestionarioService.find().subscribe(
      (data) => {
        this.lstCuestionarios = data;
      },
      (err) => this.fError(err)
    );
  }

  onMostrar() {
    this.cuestionarioService.findbyCodigo(this.data).subscribe(
      (data) => {
        this.flag = true;
        this.titulo = data.nombre;
        this.instrucciones = data.instrucciones;
        this.listarPreguntasporCuestionario();
      },
      (err) => this.fError(err)
    );

    this.cuaService.findbyCodigo(this.data).subscribe((data) => {
      this.lstConfig = data;
      let au: string = '';
      let tu: string = '';

      for (const i of this.lstConfig) {
        if (i.uaa.nombre != null) {
          au = au + ', ' + i.uaa.nombre;
        }
        if (i.usuarioTipo.nombre != null) {
          tu = tu + ', ' + i.usuarioTipo.nombre;
        }
      }
      this.validacionArregloDependencias(au, tu);

      //this.dirigido = data.usuarioTipo.nombre + "," + data.uaa.nombre + "";
    });
  }

  validacionArregloDependencias(au: any, tu: any) {
    let arau: string[] = au.split(',');
    let artu: string[] = tu.split(',');
    let arru = arau.filter(this.onlyUnique);
    let arrtu = artu.filter(this.onlyUnique);

    this.dirigido = arru.toString() + ' ' + arrtu.toString();
  }

  onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index ? value : '';
  }

  listarPreguntasporCuestionario() {
    this.preguntaService.findbyCues(this.data).subscribe(
      (data) => {
        this.lstPreguntass = data;
        let i = 0;
        for (const e of data) {
          if (this.esSoloNumeros(e.descripcion)) {
            this.obtenerImagen(+e.descripcion, i); // Pasamos el índice para asignar la foto
          }
          i = i + 1;
          if (e.tipo == 2) {
            this.preguntaService
              .findbyDependencia(e.codigo)
              .subscribe((data) => {
                this.lstSubPreguntas.push(data);
                this.lstSubPreguntas[e.codigo] = data;
              });

            this.escalaService.find(e.gre.codigo).subscribe((data) => {
              this.lstEscala.push(data);
              this.lstEscala[e.codigo] = data;
            });
          } else {
            this.prService.findByPregunta(e.codigo).subscribe((data) => {
              this.lstOpciones.push(data);
              this.lstOpciones[e.codigo] = data;
            });
          }
        }
        this.funcion();
      },
      (err) => this.fError(err)
    );
  }

  // hacer funcion que devuelva un true or false para las preguntas y de paso llene la lista de opciones
  funcion() {
    for (let index = 0; index < this.lstPreguntass.length; index++) {
      this.prService
        .findByPregunta(this.lstPreguntass[index].codigo)
        .subscribe((data) => {
          this.lstRespuestas.push(data);

          this.lstRespuestas[index] = data;
        });
    }
    // this.listarPreguntasporCuestionario();
  }
}
