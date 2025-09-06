import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth-component/auth-component';
import { AdminComponent } from './components/admin-component/admin-component';
import { UserComponent } from './components/user-component/user-component';
import { RegisterUserComponent } from './components/register-user-component/register-user-component';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'homeUser', component: UserComponent },
  { path: 'register', component: RegisterUserComponent }
];
