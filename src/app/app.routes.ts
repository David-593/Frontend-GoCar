import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth-component/auth-component';
import { AdminComponent } from './components/admin-component/admin-component';
import { UserComponent } from './components/user-component/user-component';
import { RegisterUserComponent } from './components/register-user-component/register-user-component';
import { HomeComponent } from './components/home-component/home-component';
import { UpdateUserComponent } from './components/update-user-component/update-user-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'homeUser', component: UserComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'updateUser', component: UpdateUserComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
