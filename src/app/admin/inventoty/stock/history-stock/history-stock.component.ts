import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StockService } from '../../../../_service/stock.service';
import { PaginatedResponse } from '../../../../_interface/envi';
import { StockHistory } from '../../../../_interface/stock';

@Component({
  selector: 'app-history-stock',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './history-stock.component.html',
  styleUrl: './history-stock.component.css'
})
export class HistoryStockComponent implements OnInit {
  historyStocks: StockHistory[] = [];
  message: string | null = null;
  error: string | null = null;

  produitId!: number;
  currentPage = 1;
  lastPage = 1;

  constructor(
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Récupérer l'id du produit depuis l'URL
    this.route.params.subscribe(params => {
      this.produitId = +params['id']; // /stocks/:id/history
      this.loadHistory();
    });
  }

  // Charger l'historique
  loadHistory(page: number = 1) {
    if (!this.produitId) return;
    this.stockService.getHistory(this.produitId, page).subscribe({
      next: (response: PaginatedResponse<StockHistory>) => {
        console.log("liste historique", response);
        this.historyStocks = response.data;
        this.currentPage = response.meta.current_page;
        this.lastPage = response.meta.last_page;
        this.message = 'Historique chargé avec succès';
        this.error = null;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Impossible de charger l’historique';
        this.message = null;
      }
    });
  }

  // Pagination
  prevPage() {
    if (this.currentPage > 1) this.loadHistory(this.currentPage - 1);
  }

  nextPage() {
    if (this.currentPage < this.lastPage) this.loadHistory(this.currentPage + 1);
  }

  addStock() {
    this.router.navigate(['/dashboard/move-stock']);
  }



}
