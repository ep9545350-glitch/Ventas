import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ConfiguracionModel {
  id?: number;
  nombre_negocio: string;
  zona_horaria: string;
  tema: string;
  login_seguro: boolean;
  alerta_sesion: boolean;
  notificar_ventas: boolean;
  notificar_reportes: boolean;
  alerta_inventario: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private api = 'http://localhost:8000/configuracion';

  constructor(private http: HttpClient) {}

  obtenerConfiguracion(): Observable<ConfiguracionModel> {
    return this.http.get<ConfiguracionModel>(this.api);
  }

  guardarConfiguracion(configuracion: ConfiguracionModel): Observable<ConfiguracionModel> {
    return this.http.put<ConfiguracionModel>(this.api, configuracion);
  }

}
