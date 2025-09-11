import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AutoService, AutoItf } from '../../services/auto-service/auto.service';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-component.html',
  styleUrl: './user-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserComponent implements OnInit {
  showMenu = false;
  autos: AutoItf[] = [];
  errorMsg: string = '';
  loading = true;

  private tokenListener: any;
  private lastToken: string | null = null;
  constructor(private router: Router, private autoService: AutoService) { }

  ngOnInit() {
    this.cargarAutos();
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
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error al obtener autos.';
        this.loading = false;
      }
    });
  }

  getImagenUrl(imagenUrl?: string): string {
    if (!imagenUrl) return '';
    if (imagenUrl.startsWith('http')) return imagenUrl;
    let cleanUrl = imagenUrl.replace(/^(uploads[\/])+/, '').replace(/\\/g, '/');
    while (cleanUrl.startsWith('uploads/')) {
      cleanUrl = cleanUrl.replace(/^uploads\//, '');
    }
    return `http://localhost:4000/uploads/${cleanUrl}`;
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}
