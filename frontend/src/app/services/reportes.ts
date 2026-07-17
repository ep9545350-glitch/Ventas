import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    ).pipe(
      catchError(err => {
        console.warn('Error reportes resumen:', err);
        return of(null);
      })
    );

  }

}
