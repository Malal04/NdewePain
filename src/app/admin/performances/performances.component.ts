import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-performances',
  standalone: true,
  imports: [
    CommonModule, 
    BaseChartDirective
  ],
  templateUrl: './performances.component.html',
  styleUrl: './performances.component.css'
})
export class PerformancesComponent {
  periode: string = 'mensuel';

  // 📈 Tendances des ventes
  ventesChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
    datasets: [
      {
        label: 'Ventes',
        data: [3000, 4500, 2000, 5200],
        borderColor: '#d35400',
        backgroundColor: 'rgba(211,84,0,0.08)',
        tension: 0.4,
        fill: true
      }
    ]
  };
  ventesChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true }
    }
  };

  // 🔄 Changer période
  changerPeriode(periode: string) {
    this.periode = periode;
    console.log('Période sélectionnée :', this.periode);
    // 👉 ici tu peux connecter une API pour recharger les données
  }
  
}
