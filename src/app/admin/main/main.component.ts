import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  periode = 'weekly';
  categorieId: string | null = null;

  stats: any = {
    revenu_total: 0,
    commandes_totales: 0,
    valeur_moyenne: 0,
    nouveaux_clients: 0,
    tendances_ventes: [],
    produits_vendus: [],
    depenses_clients: []
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    const params: any = { periode: this.periode };
    if (this.categorieId) params.categorie_id = this.categorieId;

    this.http.get('http://127.0.0.1:8000/api/v1/dashboard/stats', { params }).subscribe((data: any) => {
      console.log('📊 Stats globales:', data);
      this.stats = data;
      this.renderChart();
    });
  }

  renderChart() {
    const labels = this.stats.tendances_ventes.map((t: any) => t.date);
    const revenueData = this.stats.tendances_ventes.map((t: any) => t.total_revenu);

    const ctx = (document.getElementById('salesChart') as HTMLCanvasElement).getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Revenu',
          data: revenueData,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  onPeriodeChange(event: any) {
    this.periode = event.target.value.toLowerCase();
    this.loadStats();
  }

  onCategorieChange(event: any) {
    this.categorieId = event.target.value === 'Toutes' ? null : event.target.value;
    this.loadStats();
  }

}
