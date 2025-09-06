import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, loginUserItf } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  errorMsg: string = '';
  token: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const user: loginUserItf = { email: this.email, password: this.password };
    this.authService.login(user).subscribe({
      next: (res) => {
        this.token = this.authService.getToken();
      },
      error: (err) => {
        this.errorMsg = 'Credenciales incorrectas';
        console.log('Respuesta del backend:', err);
      }
    });
  }

}
