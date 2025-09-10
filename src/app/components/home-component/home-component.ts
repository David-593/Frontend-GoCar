import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AutoService, AutoItf } from '../../services/auto-service/auto.service';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule]
})
export class HomeComponent {
  getImagenUrl(imagenUrl?: string): string {
    if (!imagenUrl) return '';
    if (imagenUrl.startsWith('http')) return imagenUrl;
    // Eliminar cualquier prefijo 'uploads/' y reemplazar barras invertidas
    let cleanUrl = imagenUrl.replace(/^(uploads[\/])+/, '').replace(/\\/g, '/');
    // Si aún queda 'uploads/' al inicio, repite el reemplazo
    while (cleanUrl.startsWith('uploads/')) {
      cleanUrl = cleanUrl.replace(/^uploads\//, '');
    }
    return `${environment.apiUrl}/uploads/${cleanUrl}`;
  return `${environment.apiUrl}/uploads/${cleanUrl}`;
  }
  autos: AutoItf[] = [];
  errorMsg: string = '';

  constructor(private autoService: AutoService, private router: Router) {}

  ngOnInit() {
    this.autoService.getAutosDisponibles().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.autos = data;
        } else if (data && Array.isArray(data.autos)) {
          this.autos = data.autos;
        } else {
          this.autos = [];
        }
        this.errorMsg = '';
      },
      error: () => {
        this.errorMsg = 'Error al obtener autos disponibles.';
      }
    });
  }

  verDetalle(auto: AutoItf) {
    // Si no está logeado, redirige a login
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    // Aquí podrías navegar a una ruta de detalle, por ejemplo /auto/:id
    const id = (auto as any)._id || (auto as any).id;
    if (id) {
      this.router.navigate(['/auto', id]);
    }
  }
}
