import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service/admin.service';

@Component({
  selector: 'app-admin-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  cedula: string = '';
  usuario: any = null;
  successMsg: string = '';
  errorMsg: string = '';

  menuOpen: boolean = true;
  showBuscarUsuario: boolean = true;

  constructor(private router: Router, private adminService: AdminService, private cdr: ChangeDetectorRef) { }

  buscarUsuario() {
    this.successMsg = '';
    this.errorMsg = '';
    this.usuario = null; // Limpia el usuario antes de buscar uno nuevo
    if (!this.cedula) {
      this.errorMsg = 'Ingresa una cédula para buscar.';
      return;
    }
    this.adminService.getUserByCedula(this.cedula)
      .pipe(
        catchError((err) => {
          if (err?.error?.message === 'Usuario no encontrado' || err?.status === 404) {
            this.usuario = null;
            this.errorMsg = 'No existe usuario con esa cédula.';
          } else {
            this.usuario = null;
            this.errorMsg = 'No se pudo buscar el usuario.';
          }
          this.cdr.markForCheck();
          return of(null);
        })
      )
      .subscribe((user) => {
        if (user) {
          this.usuario = user;
          this.successMsg = 'Usuario encontrado.';
          this.cedula = '';
        }
        this.cdr.markForCheck();
      });
  }

  eliminarUsuario() {
    if (!this.usuario || !this.usuario.cedula) return;
    this.adminService.deleteUserByCedula(this.usuario.cedula).subscribe({
      next: () => {
        this.successMsg = 'Usuario eliminado correctamente.';
        this.usuario = null;
        // No borres la cédula, así puedes buscar otro usuario directamente
      },
      error: (err) => {
        this.errorMsg = 'Error al eliminar el usuario o no tienes permisos.';
      }
    });
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}