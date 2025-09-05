import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../../../_service/produit.service';
import { Produit } from '../../../_interface/produit';
import { Router, RouterModule } from '@angular/router';
import { Envi } from '../../../_interface/envi';

@Component({
  selector: 'app-index-produit',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './index-produit.component.html',
  styleUrl: './index-produit.component.css'
})
export class IndexProduitComponent {
  produits: Produit[] = [];
  searchTerm: string = '';
  message: string = '';
  error: string = '';
  environment = Envi;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private produitService: ProduitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProduits();
  }

  getProduits(page: number = 1): void {
    this.produitService.getAll(page).subscribe({
      next: (data) => {
        console.log("Liste des produits", data);
        this.produits = data.data;
        this.currentPage = data.meta.current_page;
        this.totalPages = data.meta.last_page;
        this.message = 'Les produits ont été chargés avec succès.';
        setTimeout(() => this.message = '', 1000);
      },
      error: (err) => {
        this.message = "Impossible de récupérer les produits.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }

  searchProduits(): void {
    if (this.searchTerm.trim() === '') {
      this.getProduits();
      return;
    }
    this.produitService.search(this.searchTerm).subscribe({
      next: (data) => {
        console.log("Liste des produits", data);
        this.produits = data.data;
        this.currentPage = data.meta.current_page;
        this.totalPages = data.meta.last_page;
        this.message = 'Les produits ont été chargés avec succès.';
        setTimeout(() => this.message = '', 1000);
      },
      error: (err) => {
        this.message = "Impossible de récupérer les produits.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }
  
  editProduit(id: number): void {
   this.router.navigate(['/dashboard/edit-produit', id]);
  }

  addProduit(): void {
    this.router.navigate(['/dashboard/add-produit']);
  }

  viewProduitDetails(id: number): void {
    this.router.navigate(['/dashboard/edit-produit', id]);
  }

  deleteProduit(id: number): void {
    this.produitService.delete(id).subscribe({
      next: () => {
        this.getProduits();
        this.message = 'Le produit a été supprimé avec succès.';
        setTimeout(() => this.message = '', 1000);
      },
      error: (err) => {
        this.message = "Impossible de supprimer le produit.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }

  toggleStatus(id: number): void {
    this.produitService.toggleStatus(id).subscribe({
      next: (data) => {
        this.getProduits();
        this.message = 'Statut du produit mis à jour.';
        setTimeout(() => this.message = '', 1000);
      },
      error: (err) => {
        this.message = "Impossible de changer le statut du produit.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.getProduits(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.getProduits(this.currentPage - 1);
    }
  }

}
