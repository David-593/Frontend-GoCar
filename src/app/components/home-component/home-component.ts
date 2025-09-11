import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy {
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
  loading: boolean = false;

  private tokenListener: any;
  constructor(private autoService: AutoService, private router: Router) {}

  private lastToken: string | null = null;
  ngOnInit() {
    this.cargarAutos();
    // Escuchar cambios en el token para recargar autos al login/logout
    this.lastToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    this.tokenListener = setInterval(() => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token !== this.lastToken) {
        this.lastToken = token;
        this.cargarAutos();
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.tokenListener) {
      clearInterval(this.tokenListener);
    }
  }

  cargarAutos() {
    this.loading = true;
    this.autoService.getAllAutos().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.autos = data;
        } else if (data && Array.isArray(data.autos)) {
          this.autos = data.autos;
        } else {
          this.autos = [];
        }
        this.errorMsg = '';
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error al obtener autos disponibles.';
        this.loading = false;
      }
    });
  }

  verDetalle(auto: AutoItf) {
    const id = (auto as any)._id || (auto as any).id;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      localStorage.setItem('pendingAutoObj', JSON.stringify(auto));
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/auto', id], { state: { auto } });
  }
}
