import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoService, AutoItf } from '../../services/auto-service/auto.service';

@Component({
  selector: 'app-add-auto-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-auto-component.html',
  styleUrls: ['./add-auto-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAutoComponent {
  marca: string = '';
  modelo: string = '';
  año: number | null = null;
  precio: number | null = null;
  kilometraje: number | null = null;
  color: string = '';
  descripcion: string = '';
  contacto: string = '';
  imagen: File | null = null;
  estado: 'DISPONIBLE' | 'VENDIDO' = 'DISPONIBLE';
  successMsg: string = '';
  errorMsg: string = '';

    vendedorCedula: string = '';
  constructor(private autoService: AutoService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.imagen = file ? file : null;
  }

  getVendedorCedula(): string {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.cedula || '';
    } catch {
      return '';
    }
  }

  addAuto() {
    if (!this.marca || !this.modelo || !this.año || !this.precio || !this.kilometraje || !this.color || !this.descripcion || !this.contacto || !this.imagen) {
      this.errorMsg = 'Todos los campos son obligatorios.';
      this.successMsg = '';
      return;
    }
    const auto: AutoItf = {
      vendedorCedula: this.getVendedorCedula(),
      marca: this.marca,
      modelo: this.modelo,
      year: this.año!,
      precio: this.precio!,
      kilometraje: this.kilometraje!,
      color: this.color,
      descripcion: this.descripcion,
      contacto: this.contacto,
      estado: this.estado
    };
    this.autoService.addAuto(auto, this.imagen).subscribe({
      next: () => {
        alert('Auto agregado correctamente.');
        this.successMsg = 'Auto agregado correctamente.';
        this.errorMsg = '';
        this.vendedorCedula = '';
        this.marca = '';
        this.modelo = '';
        this.año = null;
        this.precio = null;
        this.kilometraje = null;
        this.color = '';
        this.descripcion = '';
        this.contacto = '';
        this.imagen = null;
        this.estado = 'DISPONIBLE';
      },
      error: (err) => {
        console.error('Error al agregar el auto:', err);
        let msg = 'Error al agregar el auto.';
        if (err && err.error) {
          if (typeof err.error === 'string') {
            msg += ' ' + err.error;
          } else if (err.error.message) {
            msg += ' ' + err.error.message;
          } else if (err.error.errors) {
            msg += ' ' + JSON.stringify(err.error.errors);
          }
        }
        this.errorMsg = msg;
        this.successMsg = '';
      }
    });
  }
}
