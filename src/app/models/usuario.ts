export class Usuario {
  id!: number;
  username!: string;
  password!: string;
  clave2!: string;
  personaCodigo!: number;
  personaNombre!: string;
  personaApellido!: string;
  uaaNombre!: string;
  uaaCodigo!: number;
  roles: string[] = [];
  horaInicioSesion!: string;
}
