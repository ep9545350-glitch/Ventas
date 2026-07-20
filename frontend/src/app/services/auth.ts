import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';

/* =========================
   INTERFACES
========================= */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  rol: string;
}

/* =========================
   AUTH SERVICE
========================= */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly API = 'http://127.0.0.1:8000';

  login(datos: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.API}/login`,
      datos
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

/* =========================
   AUTH GUARD
========================= */

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  // Verificar que estamos en navegador
  if (typeof window !== 'undefined') {

    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }

  }

  router.navigate(['/login']);
  return false;
};
