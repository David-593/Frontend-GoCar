import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UpdateProfileData {
  cedula?: string;        // Ahora es opcional
  nombres?: string;
  apellidos?: string;
  email?: string;
  telefono?: string;
  redSocial?: string;
}
@Injectable({
  providedIn: 'root'
})

export class UpdateProfileService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updateProfile(data: UpdateProfileData): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    return this.http.put(`${this.apiUrl}/api/users/updateProfile`, data, { headers });
  }
}
