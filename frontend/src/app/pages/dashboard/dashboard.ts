import { AfterViewInit, Component, ElementRef, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements AfterViewInit {
  @ViewChild('ventasChart', { static: false }) ventasChart!: ElementRef<HTMLCanvasElement>;

  grafico: any;
  private platformId = inject(PLATFORM_ID) as Object;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId) || !this.ventasChart?.nativeElement) {
      return;
    }

    import('chart.js/auto').then(({ Chart }) => {
      const ctx = this.ventasChart.nativeElement.getContext('2d');
      if (!ctx) {
        return;
      }

      this.grafico = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
          datasets: [
            {
              label: 'Ventas S/',
              data: [1200, 1900, 3000, 2500, 4000],
            },
          ],
        },
      });
    });
  }
}
