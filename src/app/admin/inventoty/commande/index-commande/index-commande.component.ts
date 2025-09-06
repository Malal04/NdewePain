import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IngredientOrderService } from '../../../../_service/ingredient-order.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngredientOrder } from '../../../../_interface/ingredient-order';

@Component({
  selector: 'app-index-commande',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './index-commande.component.html',
  styleUrl: './index-commande.component.css'
})
export class IndexCommandeComponent {
  orders: IngredientOrder[] = [];
  message: string = '';
  error: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  isLoading: boolean = false;

  constructor(
    private orderService: IngredientOrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(page: number = 1): void {
    this.isLoading = true;
    this.orderService.pagination(page).subscribe({
      next: (res) => {
        console.log("Réponse API complète:", res);
        // Assurez-vous que res.data existe
        this.orders = res?.data ?? [];
        this.currentPage = res?.meta?.current_page ?? 1;
        this.totalPages = res?.meta?.last_page ?? 1;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Impossible de charger les commandes.';
        this.isLoading = false;
      }
    });
  }

  addOrder(): void {
    this.router.navigate(['/dashboard/add-commande-stock']);
  }

  editOrder(id: number): void {
    this.router.navigate(['/dashboard/edit-commande-stock', id]);
  }

  cancelOrder(id: number): void {
    if (!confirm('Voulez-vous vraiment annuler cette commande ?')) return;
  
    this.orderService.cancel(id).subscribe({
      next: () => {
        this.message = 'Commande annulée avec succès.';
        this.loadOrders(this.currentPage);
      },
      error: () => this.error = 'Erreur lors de l’annulation de la commande.'
    });
  }
  
  deliverOrder(id: number): void {
    if (!confirm('Marquer cette commande comme livrée ?')) return;
  
    this.orderService.deliver(id).subscribe({
      next: () => {
        this.message = 'Commande marquée comme livrée.';
        this.loadOrders(this.currentPage);
      },
      error: () => this.error = 'Erreur lors de la mise à jour de la commande.'
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadOrders(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadOrders(this.currentPage - 1);
    }
  }

}
