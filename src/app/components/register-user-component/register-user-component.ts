import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth-service/auth.service';

@Component({
  selector: 'app-register-user-component',
  imports: [CommonModule, FormsModule],
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
  telefono: string = '';
  redSocial: string = '';
  errorMsg: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    const newUser = {
      cedula: this.cedula,
      nombres: this.nombres,
      apellidos: this.apellidos,
      email: this.email,
      password: this.password,
      telefono: this.telefono ? this.telefono : undefined,
      redSocial: this.redSocial ? this.redSocial : undefined
    }

    this.authService.register(newUser).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
      }
    });
  }

}
