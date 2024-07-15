import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css'],
})
export class CuestionariosComponent {
  role: any = this.auth.user.roles;

  constructor(public auth: AuthService) {}
}
