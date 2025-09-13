import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Promotion } from '../../../_interface/promotion';
import { PromotionService } from '../../../_service/promotion.service';
import { StatutPromotion } from '../../../_enum/inventory';

@Component({
  selector: 'app-index-promotion',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './index-promotion.component.html',
  styleUrl: './index-promotion.component.css'
})
export class IndexPromotionComponent  implements OnInit {
  promotions: Promotion[] = [];
  error: string | null = null;
  message: string | null = null;
  loading: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private promotionService: PromotionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPromotions(this.currentPage);
  }

  getPromotions(page: number = 1): void {
    this.loading = true;
    this.error = null;
    this.message = null;

    this.promotionService.getAll(page).subscribe({
      next: (response) => {
        this.promotions = response.data;
        this.currentPage = response.meta.current_page;
        this.totalPages = response.meta.last_page;
        this.message = 'Promotions chargées avec succès';
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des promotions';
        console.error(err);
        this.loading = false;
      }
    });
  }

  changeStatus(promo: Promotion): void {
    this.promotionService.toggleStatus(promo.id).subscribe({
      next: () => {
        promo.status = promo.status === StatutPromotion.ACTIVE 
          ? StatutPromotion.INACTIVE 
          : StatutPromotion.ACTIVE;
        this.message = 'Statut mis à jour avec succès';
      },
      error: (err) => {
        this.error = 'Impossible de changer le statut';
        console.error(err);
      }
    });
  }

  addPromotion(): void {
    this.router.navigate(['/dashboard/add-promotion']);
  }

  editPromotion(id: number): void {
    this.router.navigate([`/dashboard/edit-promotion/${id}`]);
  }

  deletePromotion(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette promotion ?')) {
      this.promotionService.delete(id).subscribe({
        next: () => {
          this.getPromotions(this.currentPage);
          this.message = 'Promotion supprimée avec succès ';
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression ';
          console.error(err);
        }
      });
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.getPromotions(page);
    }
  }

}
