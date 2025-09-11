import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AutoService, AutoItf } from '../../services/auto-service/auto.service';

@Component({
  selector: 'app-autos-usuario-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './autos-usuario-component.html',
  styleUrls: ['./autos-usuario-component.scss']
})
export class AutosUsuarioComponent {
  getImagenUrl(imagenUrl?: string): string {
    if (!imagenUrl) return '';
    if (imagenUrl.startsWith('http')) return imagenUrl;
    let cleanUrl = imagenUrl.replace(/^(uploads[\/])+/, '').replace(/\\/g, '/');
    while (cleanUrl.startsWith('uploads/')) {
      cleanUrl = cleanUrl.replace(/^uploads\//, '');
    }
    return `http://localhost:4000/uploads/${cleanUrl}`;
  }
  autos: AutoItf[] = [];
  errorMsg = '';
  loading = true;

  constructor(private autoService: AutoService) {}

  ngOnInit() {
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
}
