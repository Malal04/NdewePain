import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RapportsService } from '../../_service/rapports.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-rapports',
  standalone: true,
  imports: [
    CommonModule, 
    BaseChartDirective
  ],
  templateUrl: './rapports.component.html',
  styleUrls: ['./rapports.component.css']
})
export class RapportsComponent {
  periode: string = 'mensuel';

  // Données backend
  stats: any = {};
  produits: any[] = [];
  tendances: any[] = [];

  // 📈 Graphique des revenus (initial vide)
  revenusChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Revenus',
        data: [],
        borderColor: '#d35400',
        backgroundColor: 'rgba(211,84,0,0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };
  revenusChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: false } }
  };

  // 📊 Graphique des dépenses (fixe pour l’instant)
  depensesChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['< 50', '50 - 100', '100 - 150', '> 150'],
    datasets: [
      {
        label: 'Dépenses',
        data: [0, 0, 0, 0],
        backgroundColor: '#d35400'
      }
    ]
  };
  depensesChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: { legend: { display: false } }
  };

  constructor(private rapportService: RapportsService) {}

  ngOnInit(): void {
    this.chargerDonnees();
  }

  // 🔄 Changer de période
  changerPeriode(periode: string) {
    this.periode = periode;
    this.chargerDonnees();
  }

  // 📥 Charger les données depuis l’API
  chargerDonnees() {
    // Stats globales
    this.rapportService.getStats(this.periode).subscribe(data => {
      console.log('📊 Stats globales:', data);
      this.stats = data;
    });
  
    // Tendances (revenus par jour)
    this.rapportService.getTendances().subscribe(data => {
      console.log('📈 Tendances (revenus):', data);
      this.tendances = data;
  
      this.revenusChartData.labels = data.map((d: any) => d.date);
      this.revenusChartData.datasets[0].data = data.map((d: any) => d.revenu);
    });
  
    // Produits les plus vendus
    this.rapportService.getProduits().subscribe(data => {
      console.log('🛒 Produits les plus vendus:', data);
      this.produits = data;
    });
  }

  // 📤 Export rapport
  exporter() {
    this.rapportService.exportRapport().subscribe(res => {
      alert(res.message);
    });
  }
}
