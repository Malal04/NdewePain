import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Stock } from '../../../../_interface/stock';
import { Envi } from '../../../../_interface/envi';
import { StockService } from '../../../../_service/stock.service';

@Component({
  selector: 'app-index-stock',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './index-stock.component.html',
  styleUrl: './index-stock.component.css'
})
export class IndexStockComponent {
  stocks: Stock[] = [];
  searchTerm: string = '';
  filterStatus: string = '';
  message: string = '';
  error: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private stockService: StockService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStocks();
  }

  getStocks(page: number = 1): void {
    this.stockService.getAll(page).subscribe({
      next: (data) => {
        console.log("liste stock", data);
        this.stocks = data.data;
        this.currentPage = data.meta.current_page;
        this.totalPages = data.meta.last_page;
        this.message = 'Les stocks ont été chargés avec succès.';
        setTimeout(() => this.message = '', 2000);
      },
      error: () => {
        this.error = "Impossible de récupérer les stocks.";
        setTimeout(() => this.error = '', 3000);
      }
    });
  }

  filterStocks(): void {
    if (this.filterStatus === '') {
      this.getStocks();
      return;
    }

    this.stocks = this.stocks.filter((s) => {
      console.log("stock", s);
      if (this.filterStatus === 'in-stock') {
        return s.quantite_actuelle > s.seuil_minimum;
      } else if (this.filterStatus === 'low-stock') {
        return s.quantite_actuelle > 0 && s.quantite_actuelle <= s.seuil_minimum;
      } else if (this.filterStatus === 'out-stock') {
        return s.quantite_actuelle === 0;
      }
      return true;
    });
  }

  editStock(id: number): void {
    this.router.navigate(['/dashboard/edit-stock', id]);
  }

  addStock(): void {
    this.router.navigate(['/dashboard/add-stock']);
  }

  deleteStock(id: number): void {
    this.stockService.delete(id).subscribe({
      next: () => {
        this.getStocks();
        this.message = 'Le stock a été supprimé avec succès.';
        setTimeout(() => this.message = '', 2000);
      },
      error: () => {
        this.message = "Impossible de supprimer le stock.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.getStocks(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.getStocks(this.currentPage - 1);
    }
  }

}
