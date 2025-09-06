import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface loginUserItf{
  email: string,
  password: string;
}

export interface registerUserItf{
  cedula: string,
  nombre: string, 
  email: string,
  password: string,
  telefono?: string,
  redSocial?: string
}

export interface loginResponseToken{
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(userRegister: registerUserItf): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`, userRegister);
  }

  login(userLogin: loginUserItf): Observable<loginResponseToken> {
    return this.http
    .post<loginResponseToken>(`${this.apiUrl}/api/auth/login`, userLogin).pipe(
      tap(res =>{
        localStorage.setItem('token', res.token);
      })
    )
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void{
    return localStorage.removeItem('token');
  }
}