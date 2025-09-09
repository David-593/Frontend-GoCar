import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

// ...existing code...
@Injectable({ providedIn: 'root' })
export class AdminService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getUserByCedula(cedula: string): Observable<any> {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
        const body = { cedula };
        return this.http.post(`${this.apiUrl}/api/admin/getUser`, body, { headers });
    }

    deleteUserByCedula(cedula: string): Observable<any> {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
        return this.http.delete(`${this.apiUrl}/api/admin/deleteUser/${cedula}`, { headers });
    }
}