import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfiguracionService, ConfiguracionModel } from '../../services/configuracion';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './configuracion.html',
  styleUrls: ['./configuracion.css']
})
export class Configuracion implements OnInit {

  configuracion: ConfiguracionModel = {
    nombre_negocio: '',
    zona_horaria: '',
    tema: '',
    login_seguro: false,
    alerta_sesion: false,
    notificar_ventas: false,
    notificar_reportes: false,
    alerta_inventario: false
  };

  constructor(
    private configuracionService: ConfiguracionService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.cargarConfiguracion();
  }

  cargarConfiguracion() {
    this.configuracionService.obtenerConfiguracion().subscribe({
      next: (resp) => this.configuracion = resp,
      error: (err) => console.error(err)
    });
  }

  guardarConfiguracion() {
    this.configuracionService.guardarConfiguracion(this.configuracion).subscribe({
      next: () => alert('Configuración guardada correctamente'),
      error: (err) => console.error(err)
    });
  }

  cambiarTema(tema: string): void {

  this.configuracion.tema = tema;

  this.themeService.cambiarTema(tema);

  }
}


