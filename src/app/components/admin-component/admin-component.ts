import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-admin-component',
  imports: [],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  
  constructor(private router: Router) { }
  
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}