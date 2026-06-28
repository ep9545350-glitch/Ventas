import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient
  ) {}

  obtenerVentas(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/ventas`
    );
  }

  crearVenta(venta: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/ventas`,
      venta
    );
  }

  obtenerVenta(id: number): Observable<any> {
  return this.http.get(
    `${this.apiUrl}/ventas/${id}`
  );
}
}
