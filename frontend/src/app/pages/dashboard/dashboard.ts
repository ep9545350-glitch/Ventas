import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  grafico:any;

  ngOnInit(){

  this.grafico = new Chart("ventasChart", {

    type: 'bar',

    data: {

      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],

      datasets: [{

        label: 'Ventas S/',

        data: [1200, 1900, 3000, 2500, 4000]

      }]

    }

  });

}
}
