import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient
  ) {}

  obtenerResumen(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/dashboard/resumen`
    ).pipe(
      catchError(err => {
        console.warn('Error dashboard:', err);
        return of(null);
      })
    );
  }
}
