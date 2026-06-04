import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export type PeriodType = 'today' | 'week' | 'month' | 'year';

export interface KpiCard {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  icon: string;
}

export interface TopProduct {
  rank: number;
  name: string;
  category: string;
  icon: string;
  revenue: number;
  units: number;
  barWidth: number;
}

export interface RecentSale {
  id: number;
  date: string;
  client: string;
  itemCount: number;
  paymentMethod: string;
  paymentIcon: string;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface PaymentBreakdown {
  label: string;
  percent: number;
  amount: number;
  color: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.html',
  styleUrls: ['./reportes.css'],
})
export class Reportes implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('revenueChartRef') revenueChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('catChartRef')     catChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('hourChartRef')    hourChartRef!: ElementRef<HTMLCanvasElement>;

  selectedPeriod: PeriodType = 'month';
  selectedMonth = '2026-06';

  periods: { key: PeriodType; label: string }[] = [
    { key: 'today', label: 'Hoy' },
    { key: 'week',  label: 'Semana' },
    { key: 'month', label: 'Mes' },
    { key: 'year',  label: 'Año' },
  ];

  private charts: Chart[] = [];

  // ── KPIs ───────────────────────────────────────────────────────────────
  kpis: KpiCard[] = [
    { label: 'Ingresos totales',    value: 'S/ 48,320', delta: '+12.4% vs mes anterior', trend: 'up',   icon: 'ti-cash'          },
    { label: 'Ventas realizadas',   value: '1,284',      delta: '+8.1% vs mes anterior',  trend: 'up',   icon: 'ti-receipt'       },
    { label: 'Ticket promedio',     value: 'S/ 37.60',  delta: '+3.9% vs mes anterior',  trend: 'up',   icon: 'ti-shopping-cart' },
    { label: 'Productos vendidos',  value: '5,921',      delta: '-2.2% vs mes anterior',  trend: 'down', icon: 'ti-package'       },
  ];

  // ── Top products ───────────────────────────────────────────────────────
  topProducts: TopProduct[] = [
    { rank: 1, name: 'Café instantáneo',   category: 'Bebidas',     icon: 'ti-coffee',         revenue: 6408, units: 720,  barWidth: 100 },
    { rank: 2, name: 'Cable USB-C 1m',     category: 'Electrónica', icon: 'ti-plug',            revenue: 4872, units: 406,  barWidth: 76  },
    { rank: 3, name: 'Audífonos Bluetooth',category: 'Electrónica', icon: 'ti-headphones',      revenue: 3960, units: 88,   barWidth: 62  },
    { rank: 4, name: 'Queso fresco 250g',  category: 'Lácteos',     icon: 'ti-cheese',          revenue: 3068, units: 590,  barWidth: 48  },
    { rank: 5, name: 'Agua mineral 600ml', category: 'Bebidas',     icon: 'ti-bottle',          revenue: 2184, units: 1456, barWidth: 34  },
  ];

  // ── Payment breakdown ──────────────────────────────────────────────────
  paymentBreakdown: PaymentBreakdown[] = [
    { label: 'Efectivo',   percent: 44, amount: 21260, color: '#185FA5' },
    { label: 'Tarjeta',    percent: 31, amount: 14979, color: '#378ADD' },
    { label: 'Yape/Plin',  percent: 25, amount: 12080, color: '#0F6E56' },
  ];

  // ── Recent sales ───────────────────────────────────────────────────────
  recentSales: RecentSale[] = [
    { id: 1284, date: '03/06 — 14:32', client: 'María García',  itemCount: 4,  paymentMethod: 'Tarjeta', paymentIcon: 'ti-credit-card',  total: 67.40,  status: 'completed' },
    { id: 1283, date: '03/06 — 14:11', client: 'Carlos López',  itemCount: 2,  paymentMethod: 'Yape',    paymentIcon: 'ti-device-mobile', total: 18.90,  status: 'completed' },
    { id: 1282, date: '03/06 — 13:58', client: '—',             itemCount: 6,  paymentMethod: 'Efectivo',paymentIcon: 'ti-cash',          total: 43.20,  status: 'completed' },
    { id: 1281, date: '03/06 — 13:40', client: 'Empresa SAC',   itemCount: 12, paymentMethod: 'Tarjeta', paymentIcon: 'ti-credit-card',  total: 218.00, status: 'pending'   },
    { id: 1280, date: '03/06 — 13:05', client: 'Juan Pérez',    itemCount: 1,  paymentMethod: 'Plin',    paymentIcon: 'ti-device-mobile', total: 12.00,  status: 'cancelled' },
  ];

  // ── Lifecycle ──────────────────────────────────────────────────────────
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.buildCharts(), 0);
  }

  ngOnDestroy(): void {
    this.charts.forEach(c => c.destroy());
  }

  // ── Chart builder ──────────────────────────────────────────────────────
  private buildCharts(): void {
    this.charts.forEach(c => c.destroy());
    this.charts = [];

    const isDark     = matchMedia('(prefers-color-scheme: dark)').matches;
    const gridColor  = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
    const tickColor  = isDark ? '#aaa' : '#888';

    // Revenue chart
    const days = Array.from({ length: 20 }, (_, i) => String(i + 1));
    const rev  = [820,1240,980,1560,1320,760,1840,1920,1480,1650,1340,1720,1990,2100,1760,1880,2210,1560,2340,1980];
    const cnt  = [22,34,28,42,38,20,52,56,41,47,38,48,55,60,50,54,62,44,66,56];

    const rc = new Chart(this.revenueChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [
          { label: 'Ingresos (S/)', data: rev, backgroundColor: isDark ? '#2a6db5' : '#185FA5', borderRadius: 3, yAxisID: 'y', order: 2 },
          { label: 'Ventas', data: cnt, type: 'line' as const, borderColor: '#0F6E56', backgroundColor: 'transparent',
            borderWidth: 2, pointRadius: 0, tension: 0.4, yAxisID: 'y2', order: 1 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x:  { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 10 }, autoSkip: false, maxRotation: 0 } },
          y:  { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 10 }, callback: (v: any) => `S/${(+v / 1000).toFixed(1)}k` } },
          y2: { position: 'right', grid: { display: false }, ticks: { color: tickColor, font: { size: 10 } } },
        },
      },
    });

    // Category donut
    const cc = new Chart(this.catChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Electrónica', 'Bebidas', 'Lácteos', 'Otros'],
        datasets: [{ data: [35, 28, 18, 19], backgroundColor: ['#185FA5','#0F6E56','#854F0B','#7F77DD'], borderWidth: 0 }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        cutout: '65%',
      },
    });

    // Hourly bar
    const hc = new Chart(this.hourChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h','19h','20h'],
        datasets: [{ data: [12,28,42,55,80,72,65,58,70,88,64,38,18], backgroundColor: '#378ADD', borderRadius: 3 }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 10 } } },
          y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 10 } } },
        },
      },
    });

    this.charts.push(rc, cc, hc);
  }

  // ── Period change ──────────────────────────────────────────────────────
  selectPeriod(period: PeriodType): void {
    this.selectedPeriod = period;
    // TODO: cargar datos del servicio según el período seleccionado
    // this.reportService.getKpis(period).subscribe(data => this.kpis = data);
    setTimeout(() => this.buildCharts(), 0);
  }

  // ── Export ─────────────────────────────────────────────────────────────
  exportPdf(): void {
    console.log('Exportar PDF');
    // TODO: this.reportService.exportPdf(this.selectedPeriod).subscribe(blob => saveAs(blob, 'reporte.pdf'));
  }

  exportExcel(): void {
    console.log('Exportar Excel');
    // TODO: this.reportService.exportExcel(this.selectedPeriod).subscribe(blob => saveAs(blob, 'reporte.xlsx'));
  }

  // ── Helpers ────────────────────────────────────────────────────────────
  formatCurrency(value: number): string {
    return `S/ ${value.toFixed(2)}`;
  }

  statusLabel(status: RecentSale['status']): string {
    const map: Record<RecentSale['status'], string> = {
      completed: 'Completada',
      pending:   'Pendiente',
      cancelled: 'Anulada',
    };
    return map[status];
  }
}
