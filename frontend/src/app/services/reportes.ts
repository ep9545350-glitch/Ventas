import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient
  ) {}

  obtenerResumen(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/reportes/resumen`
    );

  }

}
