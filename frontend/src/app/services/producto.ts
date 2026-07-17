import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient
  ) { }

  obtenerProductos(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/productos`
    ).pipe(
      catchError(err => {
        console.warn('Error obtenerProductos:', err);
        return of([]);
      })
    );
  }

  crearProducto(producto: any): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/productos`,
    producto
  );
}

eliminarProducto(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/productos/${id}`);
}


actualizarProducto(id: number, producto: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/productos/${id}`, producto);
}
}
