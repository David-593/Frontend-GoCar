import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AutoService, AutoItf } from '../../services/auto-service/auto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mis-autos-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-autos-component.html',
  styleUrls: ['./mis-autos-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MisAutosComponent implements OnInit {
  cedula: string = '';
  autos: AutoItf[] = [];
  errorMsg: string = '';
  successMsg: string = '';

  constructor(private autoService: AutoService) {}

  ngOnInit() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.cedula = payload.cedula || '';
      this.getMisAutos();
    }
  }

  getMisAutos() {
    if (!this.cedula) {
      this.errorMsg = 'No se encontró la cédula del usuario.';
      return;
    }
    this.autoService.getMisAutos(this.cedula).subscribe({
      next: (data) => {
        // Si la respuesta es un objeto con autos, ajusta aquí
        if (Array.isArray(data)) {
          this.autos = data;
        } else if (data && Array.isArray(data.autos)) {
          this.autos = data.autos;
        } else {
          this.autos = [];
        }
        this.errorMsg = '';
      },
      error: (err) => {
        this.errorMsg = 'Error al obtener tus autos.';
      }
    });
  }

  venderAuto(auto: AutoItf) {
    // El id puede ser _id, id, o cualquier campo único según backend
    const id = (auto as any)._id || (auto as any).id;
    if (!id) {
      this.errorMsg = 'No se encontró el identificador del auto.';
      return;
    }
    this.autoService.venderAuto(id).subscribe({
      next: () => {
        this.successMsg = 'Auto marcado como vendido.';
        this.getMisAutos();
      },
      error: () => {
        this.errorMsg = 'Error al marcar como vendido.';
      }
    });
  }
}
