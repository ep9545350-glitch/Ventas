import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ReportesService } from '../../services/reportes';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './reportes.html',
  styleUrls: ['./reportes.css'],
})
export class Reportes implements OnInit {

  ventasTotales: number = 0;
  transacciones: number = 0;
  mejorDia: string = '';
  mejorCajero: string = '';

  constructor(
    private reportesService: ReportesService
  ) {}

  ngOnInit(): void {
    this.cargarResumen();
  }

  cargarResumen(): void {
    this.reportesService.obtenerResumen()
      .subscribe((data: any) => {

        this.ventasTotales = data.ventas_totales;
        this.transacciones = data.transacciones;
        this.mejorDia = data.mejor_dia;
        this.mejorCajero = data.mejor_cajero;

      });
  }
}
