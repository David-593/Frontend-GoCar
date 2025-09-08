import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpdateProfileService, UpdateProfileData } from '../../services/updateProfile-service/updateProfile.service';

@Component({
  selector: 'app-update-user-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-user-component.html',
  styleUrl: './update-user-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateUserComponent {
  nombres: string = '';
  apellidos: string = '';
  email: string = '';
  telefono: string = '';
  redSocial: string = '';
  successMsg: string = '';
  errorMsg: string = '';

  constructor(private updateProfileService: UpdateProfileService) {}

  updateProfile() {
    const data: UpdateProfileData = {};
    if (this.nombres) data.nombres = this.nombres;
    if (this.apellidos) data.apellidos = this.apellidos;
    if (this.email) data.email = this.email;
    if (this.telefono) data.telefono = this.telefono;
    if (this.redSocial) data.redSocial = this.redSocial;

    this.updateProfileService.updateProfile(data).subscribe({
      next: (response) => {
        this.successMsg = 'Perfil actualizado correctamente.';
        this.errorMsg = '';
      },
      error: (err) => {
        console.log('Error al actualizar el perfil:', err);
        this.errorMsg = 'Error al actualizar el perfil.';
        this.successMsg = '';
      }
    });
  }
}
