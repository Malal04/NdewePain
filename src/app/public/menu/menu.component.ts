import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from "../../_utils/footer/footer.component";
import { HeaderComponent } from "../../_utils/header/header.component";
import { Router, RouterLink } from '@angular/router';
import { Produit } from '../../_interface/produit';
import { ProduitService } from '../../_service/produit.service';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_interface/category';
import { PanierService } from '../../_service/panier.service';
import { CartResponse } from '../../_interface/panier';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    FooterComponent,
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  produits: Produit[] = [];
  categories: Category[] = [];
  cart?: CartResponse;

  searchTerm: string = '';
  message: string = '';
  error: string = '';
  selectedCategory: number | null = null;
  sortOption: string = 'popularite';

  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private produitService: ProduitService,
    private categoryService: CategoryService,
    private panierService: PanierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProduits();
    this.getCategories();
  }

  getProduits(page: number = 1): void {
    this.produitService.getAll(page).subscribe({
      next: (data) => {
        console.log("Liste des produits", data);
        this.produits = data.data;
        this.currentPage = data.meta.current_page;
        this.totalPages = data.meta.last_page;
        this.message = 'Les produits ont été chargés avec succès.';
        setTimeout(() => this.message = '', 2000);
      },
      error:  (err) => {
        this.error = err.error?.message || "Erreur lors de la récupération des produits.";
        setTimeout(() => this.error = '', 3000);
        console.error("Erreur lors de la récupération des produits", err);
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
        this.produits = data.data;
        this.currentPage = data.meta.current_page;
        this.totalPages = data.meta.last_page;
        this.message = 'Résultats de recherche chargés.';
        setTimeout(() => this.message = '', 2000);
      },
      error: () => {
        this.message = "Erreur lors de la recherche.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }

  getCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data.data;
      },
      error: () => {
        this.message = "Impossible de récupérer les catégories.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }

  addProduct(id: number) {
    console.log("Ajouter au panier, id produit:", id);
    this.panierService.addItem(id, 1).subscribe({
      next: res => {
        console.log("Ajout produit", res);
        this.cart = res;
        this.message = 'Le produit a été ajouté au panier.';
        setTimeout(() => this.message = '', 2000);
        this.router.navigate(['/chechout/cart']);
      },
      error: err => { 
        console.error("Erreur lors de l’ajout au panier", err);
        setTimeout(() => this.error = '', 2000);
        alert('la quantité disponible est de ' + err.error.quantite + ' ' + err.error.message);
      }
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.getProduits();
  }

  sortProduits(): void {
    this.getProduits();
  }

  filterByCategory(id: number): void {
    this.getProduits();
  }

  viewProduitDetails(id: number): void {
    this.router.navigate(['/details', id]);
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
