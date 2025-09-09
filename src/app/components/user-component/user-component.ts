import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-component.html',
  styleUrl: './user-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserComponent {
  usuario: any = {
    cedula: '1234567890',
    nombres: 'Juan',
    apellidos: 'Pérez',
    telefono: '0999999999',
    email: 'juan.perez@email.com',
    redSocial: '@juanperez'
  };

  constructor(private router: Router) { }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}
