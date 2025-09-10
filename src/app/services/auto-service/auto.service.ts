
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AutoItf {
  cedula?: string;
  marca?: string;
  modelo?: string;
  anio?: number;
  precio?: number;
  // otros campos según tu backend
}

@Injectable({ providedIn: 'root' })
export class AutoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders | undefined {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
  }

  addAuto(data: AutoItf, imagen: File): Observable<any> {
    const headers = this.getAuthHeaders();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.post(`${this.apiUrl}/api/auto/add`, formData, { headers });
  }

  getMisAutos(cedula: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/api/auto/mis-autos/${cedula}`, { headers });
  }

  venderAuto(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.apiUrl}/api/auto/vender/${id}`, {}, { headers });
  }

  getAutosDisponibles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/auto/disponibles`);
  }
}
