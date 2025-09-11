import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AutoItf {
  id?: number;
  vendedorCedula: string;
  marca: string;
  modelo: string;
  year: number;
  precio: number;
  kilometraje: number;
  color: string;
  descripcion: string;
  imagen?: File;
  imagenUrl?: string;
  estado?: 'DISPONIBLE' | 'VENDIDO';
  contacto: string;
  fechaPublicacion?: string;
}

@Injectable({ providedIn: 'root' })
export class AutoService {
  getAutoById(id: string): Observable<AutoItf> {
    return this.http.get<AutoItf>(`${this.apiUrl}/api/auto/${id}`);
  }
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders | undefined {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
  }

  addAuto(data: AutoItf, imagen: File): Observable<any> {
    const headers = this.getAuthHeaders();
    const formData = new FormData();
    // Enviar todos los campos requeridos con nombres exactos
    formData.append('vendedorCedula', data.vendedorCedula);
    formData.append('marca', data.marca);
    formData.append('modelo', data.modelo);
    formData.append('year', data.year.toString());
    formData.append('precio', data.precio.toString());
    formData.append('kilometraje', data.kilometraje.toString());
    formData.append('color', data.color);
    formData.append('descripcion', data.descripcion);
    formData.append('contacto', data.contacto);
    if (data.estado) {
      formData.append('estado', data.estado);
    }
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.post(`${this.apiUrl}/api/auto/add`, formData, { headers });
  }

  getMisAutos(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/api/auto/mis-autos`, { headers });
  }

  venderAuto(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.apiUrl}/api/auto/vender/${id}`, {}, { headers });
  }

  getAllAutos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/auto`);
  }
}
