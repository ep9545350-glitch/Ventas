import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements AfterViewInit, OnInit {

  @ViewChild('ventasChart', { static: false })
  ventasChart!: ElementRef<HTMLCanvasElement>;

  grafico: any;
  private platformId = inject(PLATFORM_ID) as Object;

  // ====== DATOS REALES ======
  ventasHoy = 0;
  ventasMes = 0;
  totalProductos = 0;
  stockBajo = 0;
  ultimasVentas: any[] = [];

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.cargarDashboard();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.ventasChart?.nativeElement) {
      return;
    }

    import('chart.js/auto').then(({ Chart }) => {
      const ctx = this.ventasChart.nativeElement.getContext('2d');

      if (!ctx) return;

      this.grafico = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
          datasets: [
            {
              label: 'Ventas S/',
              data: [0, 0, 0, 0, 0, 0, 0],
            },
          ],
        },
      });
    });
  }

  // ====== CARGAR DASHBOARD ======
  cargarDashboard(): void {

    this.dashboardService.obtenerResumen()
      .subscribe({
          next: (data) => {

            if (!data) return;

            this.ventasHoy = data.ventas_hoy;
          this.ventasMes = data.ventas_mes;
          this.totalProductos = data.total_productos;
          this.stockBajo = data.stock_bajo;
          this.ultimasVentas = data.ultimas_ventas;

          this.actualizarGrafico();

        },
        error: (err) => {
          console.log('Error dashboard:', err);
        }
      });

  }

  // ====== ACTUALIZAR GRÁFICO ======
  actualizarGrafico(): void {

    if (!this.grafico) return;

    const base = this.ventasMes || 0;

    this.grafico.data.datasets[0].data = [
      base * 0.15,
      base * 0.10,
      base * 0.20,
      base * 0.25,
      base * 0.18,
      base * 0.07,
      base * 0.05
    ];

    this.grafico.update();
  }
}
