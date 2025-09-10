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
  anio: number | null = null;
  precio: number | null = null;
  imagen: File | null = null;
  successMsg: string = '';
  errorMsg: string = '';

  constructor(private autoService: AutoService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.imagen = file ? file : null;
  }

  addAuto() {
    if (!this.marca || !this.modelo || !this.anio || !this.precio || !this.imagen) {
      this.errorMsg = 'Todos los campos son obligatorios.';
      this.successMsg = '';
      return;
    }
    const auto: AutoItf = {
      marca: this.marca,
      modelo: this.modelo,
      anio: this.anio,
      precio: this.precio
    };
    this.autoService.addAuto(auto, this.imagen).subscribe({
      next: () => {
        this.successMsg = 'Auto agregado correctamente.';
        this.errorMsg = '';
        this.marca = '';
        this.modelo = '';
        this.anio = null;
        this.precio = null;
        this.imagen = null;
      },
      error: (err) => {
        this.errorMsg = 'Error al agregar el auto.';
        this.successMsg = '';
      }
    });
  }
}
