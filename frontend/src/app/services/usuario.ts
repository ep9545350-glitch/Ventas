import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient
  ) { }

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/usuarios`
    );
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/usuarios`,
      usuario
    );
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/usuarios/${id}`,
      usuario
    );
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/usuarios/${id}`
    );
  }
}
