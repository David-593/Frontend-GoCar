import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AutoService, AutoItf } from '../../services/auto-service/auto.service';

@Component({
  selector: 'app-auto-detail-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auto-detail-component.html',
  styleUrls: ['./auto-detail-component.scss']
})
export class AutoDetailComponent implements OnInit, OnDestroy {
  getImagenUrl(imagenUrl?: string): string {
    if (!imagenUrl) return '';
    if (imagenUrl.startsWith('http')) return imagenUrl;
    let cleanUrl = imagenUrl.replace(/^(uploads[\/])+/, '').replace(/\\/g, '/');
    while (cleanUrl.startsWith('uploads/')) {
      cleanUrl = cleanUrl.replace(/^uploads\//, '');
    }
    return `http://localhost:4000/uploads/${cleanUrl}`;
  }
  auto: AutoItf | null = null;
  loading = true;
  errorMsg = '';

  private tokenListener: any;
  private lastToken: string | null = null;
  constructor(private route: ActivatedRoute, private router: Router, private autoService: AutoService) {}

  ngOnInit() {
    this.cargarAuto();
    this.lastToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    this.tokenListener = setInterval(() => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token !== this.lastToken) {
        this.lastToken = token;
        this.cargarAuto();
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.tokenListener) {
      clearInterval(this.tokenListener);
    }
  }

  cargarAuto() {
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras.state && nav.extras.state['auto']) {
      this.auto = nav.extras.state['auto'];
      this.loading = false;
      return;
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.errorMsg = '';
      this.autoService.getAutoById(id).subscribe({
        next: (data) => {
          this.auto = data;
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'No se pudo cargar el auto.';
          this.loading = false;
        }
      });
    } else {
      this.errorMsg = 'No se pudo cargar el auto.';
      this.loading = false;
    }
  }
}
