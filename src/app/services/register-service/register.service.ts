import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface registerUserItf {
    cedula: string,
    nombres: string,
    apellidos: string,
    email: string,
    password: string,
    telefono?: string,
    redSocial?: string
}
@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    register(userRegister: registerUserItf): Observable<any> {
        return this.http.post(`${this.apiUrl}/api/auth/register`, userRegister);
    }
}