import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register-service/register.service';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-user-component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register-user-component.html',
  styleUrl: './register-user-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterUserComponent {
  cedula: string = '';
  nombres: string = '';
  apellidos: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  telefono: string = '';
  redSocial: string = '';
  errorMsg: string = '';
  successMsg: string = '';
  passwordsMatch: boolean = true;

  constructor(private userService: RegisterService, private router: Router) { }

  validatePasswords() {
    this.passwordsMatch = this.password === this.repeatPassword;
  }

  register() {
    this.validatePasswords();
    if (!this.passwordsMatch) {
      this.errorMsg = 'Las contraseñas no coinciden.';
      return;
    }
    const newUser = {
      cedula: this.cedula,
      nombres: this.nombres,
      apellidos: this.apellidos,
      email: this.email,
      password: this.password,
      telefono: this.telefono ? this.telefono : undefined,
      redSocial: this.redSocial ? this.redSocial : undefined
    }

    this.userService.register(newUser).subscribe({
      next: (response) => {
        this.successMsg = 'Usuario creado correctamente.';
        this.errorMsg = '';
        alert('Usuario creado correctamente.');
      },
      error: (error) => {
        this.errorMsg = 'Error al registrar usuario.';
        this.successMsg = '';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
