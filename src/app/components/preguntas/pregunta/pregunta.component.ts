import { CargarImagenPreguntaService } from './../../../services/cargar-imagen-pregunta.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { GrupoEscala } from 'src/app/models/grupo-escala';
import { TipoRespuesta } from 'src/app/models/tipo-respuesta';
import { AuthService } from 'src/app/services/auth.service';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { GrupoEscalaService } from 'src/app/services/grupo-escala.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { TipoRespuestaService } from 'src/app/services/tipo-respuesta.service';
import { Pregunta } from 'src/app/models/pregunta';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PreguntaRespuestas } from 'src/app/models/pregunta-respuestas';
import { Escala } from 'src/app/models/escala';
import { CuestionarioConfiguracion } from 'src/app/models/cuestionario-configuracion';
import { EscalaService } from 'src/app/services/escala.service';
import { CuestionarioConfiguracionService } from 'src/app/services/cuestionario-configuracion.service';
import { PreguntaRespuestaService } from 'src/app/services/pregunta-respuesta.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css'],
})
export class PreguntaComponent implements OnInit {
  nombreArchivo = 'Seleccione la imágen';
  isChecked = true;
  editar: boolean = false;
  cueVerificacion: boolean = false;
  depende: boolean = false;
  gre: boolean = false;
  lstGre!: GrupoEscala[];
  tipoPregunta: boolean = true;

  lstTipoRespuesta!: TipoRespuesta[];
  lstCuestionario!: Cuestionario[];
  lstPreguntas!: Pregunta[];

  form!: FormGroup;
  form2!: FormGroup;

  validador: boolean = false;
  file!: FileList;
  foto = {
    url: '',
  };

  //Tabla

  dataSource = new MatTableDataSource<Pregunta>([]);

  displayedColumns: string[] = [
    'id',
    'descripcion',
    'textoAdicional',
    'tipoRespuesta',
    'cuestionario',
    'obligatorio',
    'editar',
  ];

  //Paginador

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  constructor(
    private preguntaService: PreguntaService,
    private tipoRespuestaService: TipoRespuestaService,
    private fb: FormBuilder,
    private cueService: CuestionarioService,
    private greService: GrupoEscalaService,
    private auth: AuthService,
    private router: Router,
    private cargarImagenPreguntaService: CargarImagenPreguntaService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalVistaPrevia, {
      data: this.form2.get('cuestionario')!.value,
    });
  }

  onRadioChange(value: string) {
    this.tipoPregunta = value === 'texto'; // Si es 'texto', es true. Si es 'imagen', es false.
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  esSoloNumeros(descripcion: string): boolean {
    return /^\d+$/.test(descripcion);
  }

  ngOnInit() {
    if (this.auth.validacionToken()) {
      this.listarTipoRespuestas();
      this.initForm();
      this.listarCuestionario();
    }
    //this.find();
  }

  change(file: any): void {
    const foto: any = (event?.target as HTMLInputElement)?.files?.[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.form.get('descripcion')!.setValue(reader.result as string);
      this.foto.url = reader.result as string;
    };
    reader.readAsDataURL(foto);
    if (file.target.files[0].size > 8100000) {
      Swal.fire({
        title: 'El archivo supera el limite de tamaño que es de 8mb',
        confirmButtonText: 'Entiendo',
        confirmButtonColor: '#8f141b',
        showConfirmButton: true,
      });
    } else {
      this.file = file.target.files[0];
      Swal.fire({
        icon: 'success',
        title: 'Documento cargado de manera exitosa.',
        showConfirmButton: true,
        confirmButtonText: 'Listo',
        confirmButtonColor: '#8f141b',
      });
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

  obtenerImagen(item: number) {
    this.cargarImagenPreguntaService.mirarSoporte(item).subscribe((data) => {
      var blob = new Blob([data], { type: 'image/png' });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        this.foto.url = reader.result as string;
      };
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      descripcion: new FormControl('', Validators.required),
      texto: new FormControl(''),
      trespuesta: new FormControl('', Validators.required),
      tipo: new FormControl(''),
      codigo: new FormControl(''),
      grup: new FormControl(''),
      obligatorio: [true],
      depende: new FormControl(''),
      id: new FormControl(''),
    });
    this.form2 = this.fb.group({
      cuestionario: new FormControl('', Validators.required),
    });
  }

  onEditarClick(element: Pregunta) {
    let ob: boolean;
    if (element.obligatorio == 1) {
      ob = true;
    } else {
      ob = false;
    }
    this.editar = true;
    this.form.get('codigo')!.setValue(element.codigo);
    this.form.get('descripcion')!.setValue(element.descripcion);
    if (this.esSoloNumeros(element.descripcion)) {
      this.tipoPregunta = false;
      this.obtenerImagen(+element.descripcion);
    } else {
      this.tipoPregunta = true;
    }
    this.form.get('texto')!.setValue(element.textoAdicional);
    this.form.get('trespuesta')!.setValue(element.tipoRespuesta.codigo);
    this.form.get('tipo')!.setValue(element.tipo);
    this.form2.get('cuestionario')!.setValue(element.cuestionario.codigo);
    this.form.get('obligatorio')!.setValue(ob);
    this.form.get('grup')!.setValue(element.gre.codigo);
    this.form.get('id')!.setValue(element.identificador);
  }

  scroll(page: HTMLElement): void {
    page.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  listarTipoRespuestas() {
    this.tipoRespuestaService.find().subscribe(
      (data) => {
        this.lstTipoRespuesta = data;
      },
      (err) => this.fError(err)
    );
  }

  listarCuestionario() {
    this.cueService.find().subscribe(
      (data) => {
        this.lstCuestionario = data;
      },
      (err) => this.fError(err)
    );
    this.greService.find().subscribe(
      (data) => {
        this.lstGre = data;
      },
      (err) => this.fError(err)
    );
  }

  find() {
    this.preguntaService
      .findAdminList(this.form2.get('cuestionario')!.value)
      .subscribe(
        (data) => {
          this.dataSource = new MatTableDataSource<Pregunta>(data);

          this.paginator.firstPage();
          this.dataSource.paginator = this.paginator;
        },
        (err) => this.fError(err)
      );
    this.preguntaService
      .findbyCuest(this.form2.get('cuestionario')!.value)
      .subscribe(
        (data) => {
          this.lstPreguntas = data;
          this.depende = false;
          this.form.get('depende')!.clearValidators();
          this.form.get('depende')!.updateValueAndValidity();
          this.form.get('grup')!.clearValidators();
          this.form.get('grup')!.updateValueAndValidity();
        },
        (err) => this.fError(err)
      );
  }

  onCrear(): void {
    let ob: number;

    if (this.form.get('obligatorio')!.value) {
      ob = 1;
    } else {
      ob = 0;
    }

    let pregunta: Pregunta = new Pregunta();
    let preVlidar: Pregunta = new Pregunta();
    preVlidar.codigo = this.form.get('codigo')!.value;

    let tipoRespuesta: TipoRespuesta = new TipoRespuesta();
    let cue: Cuestionario = new Cuestionario();
    cue.codigo = this.form2.get('cuestionario')!.value;

    let grup: GrupoEscala = new GrupoEscala();
    grup.codigo = this.form.get('grup')!.value;

    tipoRespuesta.codigo = this.form.get('trespuesta')!.value;
    preVlidar.tipoRespuesta = tipoRespuesta;
    preVlidar.descripcion = this.form.get('descripcion')!.value;

    preVlidar.textoAdicional = this.form.get('texto')!.value;
    preVlidar.tipo = this.form.get('tipo')!.value;
    preVlidar.depende = this.form.get('depende')!.value;
    preVlidar.identificador = this.form.get('id')!.value;

    if (preVlidar.textoAdicional == null) {
      //preVlidar.textoAdicional = null;
    }

    if (preVlidar.identificador == null) {
      //preVlidar.identificador = null;
    }
    if (preVlidar.depende == 0 || preVlidar.depende == null) {
      //preVlidar.depende = null;
    }

    preVlidar.obligatorio = ob;
    preVlidar.cuestionario = cue;
    preVlidar.gre = grup;

    pregunta = preVlidar;

    if (!this.editar) {
      if (this.tipoPregunta) {
        this.resgistrarPreguntaTexto(pregunta);
      } else {
        this.resgistrarPreguntaImagen(pregunta);
      }
      this.onCancelar();
      this.find();
    } else {
      this.actualizar(pregunta);

      this.find();
    }
  }

  actualizar(pregunta: Pregunta) {
    this.preguntaService.update(pregunta).subscribe(
      (data) => {
        this.mensajeSuccses();
        this.find();
        this.onCancelar();
      },
      (err) => this.fError(err)
    );
  }

  onCancelar() {
    this.form.reset();
    this.editar = false;
    this.depende = false;
    this.foto.url = '';
    this.tipoPregunta = true;
    this.form.get('depende')!.clearValidators();
    this.form.get('depende')!.updateValueAndValidity();
    this.form.get('grup')!.clearValidators();
    this.form.get('grup')!.updateValueAndValidity();
  }

  onEliminar() {
    let codigo = this.form.get('codigo')!.value;
    this.preguntaService.delete(codigo).subscribe(
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

  resgistrarPreguntaTexto(pregunta: Pregunta) {
    this.preguntaService.create(pregunta).subscribe(
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

  resgistrarPreguntaImagen(pregunta: Pregunta) {
    let file: any = this.file;
    const arch = new File([file], 'ImagenPregunta.png', {
      type: file.type,
    });

    this.cargarImagenPreguntaService
      .registrarPregunta(arch, pregunta)
      .subscribe(
        (data) => {
          this.mensajeSuccses();
          this.foto.url = '';
          this.tipoPregunta = false;
          this.find();
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

  onCuest() {
    this.cueVerificacion = true;
    this.find();
  }

  onDependencia() {
    if (this.form.get('tipo')!.value == 1) {
      this.depende = true;
      this.form.get('depende')!.setValidators(Validators.required);
      this.form.get('depende')!.updateValueAndValidity();
    } else {
      this.depende = false;
      this.form.get('depende')!.clearValidators();
      this.form.get('depende')!.updateValueAndValidity();
    }
  }

  onGre() {
    if (this.form.get('tipo')!.value == 2) {
      this.gre = true;
      this.form.get('grup')!.setValidators(Validators.required);
      this.form.get('grup')!.updateValueAndValidity();
    } else {
      this.gre = false;
      this.form.get('grup')!.clearValidators();
      this.form.get('grup')!.updateValueAndValidity();
    }
  }
}

//MODAL
@Component({
  selector: 'modal-vista-previa',
  templateUrl: 'modal-vista-previa.component.html',
  styleUrls: ['./pregunta.component.css'],
})
export class ModalVistaPrevia {
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
    public dialogRef: MatDialogRef<ModalVistaPrevia>,
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
