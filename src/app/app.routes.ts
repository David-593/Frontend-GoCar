import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth-component/auth-component';
import { AdminComponent } from './components/admin-component/admin-component';
import { UserComponent } from './components/user-component/user-component';
import { RegisterUserComponent } from './components/register-user-component/register-user-component';
import { HomeComponent } from './components/home-component/home-component';
import { UpdateUserComponent } from './components/update-user-component/update-user-component';
import { AddAutoComponent } from './components/add-auto-component/add-auto-component';
import { MisAutosComponent } from './components/mis-autos-component/mis-autos-component';
import { AutosDisponiblesComponent } from './components/autos-disponibles-component/autos-disponibles-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'autosUsuario', loadComponent: () => import('./components/autos-usuario-component/autos-usuario-component').then(m => m.AutosUsuarioComponent) },
  { path: 'auto/:id', loadComponent: () => import('./components/auto-detail-component/auto-detail-component').then(m => m.AutoDetailComponent) },
  { path: 'login', component: AuthComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'homeUser', component: UserComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'updateUser', component: UpdateUserComponent },
  { path: 'addAuto', component: AddAutoComponent },
  { path: 'misAutos', component: MisAutosComponent },
  { path: 'autosDisponibles', component: AutosDisponiblesComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
