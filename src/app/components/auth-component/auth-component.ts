import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, loginUserItf } from '../../services/auth-service/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-component',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  errorMsg: string = '';
  token: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.token = this.authService.getToken();
      if (this.token) {
        console.log('Token Obtenido');
      }
    }
  }

  private validateRole() {
    const tokenTexto: string = atob(this.token!.split('.')[1]);
    const tokenJson = JSON.parse(tokenTexto);
    const role = (tokenJson.rol || '').toLowerCase().trim();
    console.log('Valor normalizado de rol:', role);
    const pendingAutoObj = typeof window !== 'undefined' ? localStorage.getItem('pendingAutoObj') : null;
    if (pendingAutoObj) {
      localStorage.removeItem('pendingAutoObj');
      const auto = JSON.parse(pendingAutoObj);
      const id = (auto as any)._id || (auto as any).id;
      this.router.navigate(['/auto', id], { state: { auto } });
      return;
    }
    if (role === 'admin') {
      console.log('Entró en admin');
      this.router.navigate(['/admin']);
    } else if (role === 'user') {
      console.log('Entró en user');
      this.router.navigate(['/homeUser']);
    } else {
      this.errorMsg = 'Rol no reconocido';
      console.log('Rol no reconocido en el token:', tokenJson);
    }
  }
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

  login() {
    if (!this.email || !this.password) {
      this.errorMsg = 'Debes ingresar email y contraseña.';
      return;
    }
    const user: loginUserItf = { email: this.email, password: this.password };
    this.authService.login(user).subscribe({
      next: (res) => {
        this.token = this.authService.getToken();
        if (this.token) {
          this.validateRole();
        }
      },
      error: (err) => {
        this.errorMsg = 'Credenciales incorrectas';
        console.log('Respuesta del backend:', err);
      }
    });
  }

}
