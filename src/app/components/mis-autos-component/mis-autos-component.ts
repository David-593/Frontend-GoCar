import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  autos: AutoItf[] = [];
  errorMsg: string = '';
  successMsg: string = '';

  constructor(private autoService: AutoService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getMisAutos();
  }

  getMisAutos() {
    this.autoService.getMisAutos().subscribe({
      next: (data) => {
        console.log('Respuesta mis autos:', data);
        if (Array.isArray(data)) {
          this.autos = data;
        } else if (data && Array.isArray(data.autos)) {
          this.autos = data.autos;
        } else {
          this.autos = [];
        }
        this.errorMsg = '';
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMsg = 'Error al obtener tus autos.';
      }
    });
  }

  venderAuto(auto: AutoItf) {
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
