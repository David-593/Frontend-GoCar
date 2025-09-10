import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AutoService, AutoItf } from '../../services/auto-service/auto.service';

@Component({
  selector: 'app-autos-disponibles-component',
  imports: [CommonModule],
  templateUrl: './autos-disponibles-component.html',
  styleUrls: ['./autos-disponibles-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutosDisponiblesComponent implements OnInit {
  autos: AutoItf[] = [];
  errorMsg: string = '';

  constructor(private autoService: AutoService) {}

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
}
