import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Ingredient } from '../../../../_interface/ingredient';
import { IngredientService } from '../../../../_service/ingredient.service';
import { Envi } from '../../../../_interface/envi';
import { SupplierService } from '../../../../_service/supplier.service';
import { Supplier } from '../../../../_interface/supplier';


@Component({
  selector: 'app-index-ingredient',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './index-ingredient.component.html',
  styleUrl: './index-ingredient.component.css'
})
export class IndexIngredientComponent {
  ingredients: Ingredient[] = [];
  suppliers: Supplier[] = [];
  searchTerm: string = '';
  message: string = '';
  environment = Envi;
  searchType: string = 'ingredients';

  onSearch(): void {
    if (this.searchType === 'ingredients') {
      this.searchIngredients();
    } else {
      this.searchSuppliers();
    }
  }

  // pagination
  currentPageIngredients: number = 1;
  totalPagesIngredients: number = 1;

  currentPageSuppliers: number = 1;
  totalPagesSuppliers: number = 1;

  constructor(
    private ingredientService: IngredientService,
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getIngredients();
    this.getSuppliers();
  }

  // ===========================
  // INGREDIENTS
  // ===========================
  getIngredients(page: number = 1): void {
    this.ingredientService.pagination(page).subscribe({
      next: (data) => {
        console.log("liste ingredient", data);
        this.ingredients = data.data;
        this.currentPageIngredients = data.meta.current_page;
        this.totalPagesIngredients = data.meta.last_page;
      },
      error: () => {
        this.message = "Impossible de récupérer les ingrédients.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }

  searchIngredients(): void {
    if (!this.searchTerm.trim()) {
      this.getIngredients();
      return;
    }
    this.ingredientService.search(this.searchTerm).subscribe({
      next: (data) => {
        console.log("liste ingredient", data);
        this.ingredients = data.data;
        this.currentPageIngredients = data.meta.current_page;
        this.totalPagesIngredients = data.meta.last_page;
      },
      error: () => {
        this.message = "Erreur lors de la recherche d'ingrédients.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }

  deleteIngredient(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce ingredient ?")) {
      this.ingredientService.delete(id).subscribe({
        next: () => this.getIngredients(),
        error: () => {
          this.message = "Impossible de supprimer l'ingrédient.";
          setTimeout(() => this.message = '', 3000);
        }
      });
    }
  }

  // ===========================
  // SUPPLIERS
  // ===========================
  getSuppliers(page: number = 1): void {
    this.supplierService.pagination(page).subscribe({
      next: (data) => {
        console.log("liste supplier", data);
        this.suppliers = data.data;
        this.currentPageSuppliers = data.meta.current_page;
        this.totalPagesSuppliers = data.meta.last_page;
      },
      error: () => {
        this.message = "Impossible de récupérer les fournisseurs.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }

  searchSuppliers(): void {
    if (!this.searchTerm.trim()) {
      this.getSuppliers();
      return;
    }
    this.supplierService.search(this.searchTerm).subscribe({
      next: (data) => {
        console.log("liste supplier", data);
        this.suppliers = data.data;
        this.currentPageSuppliers = data.meta.current_page;
        this.totalPagesSuppliers = data.meta.last_page;
      },
      error: () => {
        this.message = "Erreur lors de la recherche de fournisseurs.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }

  deleteSupplier(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce fournisseur ?")) {
      this.supplierService.delete(id).subscribe({
        next: () => this.getSuppliers(),
        error: () => {
          this.message = "Impossible de supprimer le fournisseur.";
          setTimeout(() => this.message = '', 3000);
        }
      });
    }
  }

  // ===========================
  // NAVIGATION
  // ===========================
  editIngredient(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir modifier ce fournisseur ?")) {
      this.router.navigate(['/dashboard/edit-ingredient', id]);
    }
  }

  addIngredient(): void {
    this.router.navigate(['/dashboard/add-ingredient']);
  }

  editSupplier(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir modifier ce fournisseur ?")) {
      this.router.navigate(['/dashboard/edit-supplier', id]);
    }
  }

  addSupplier(): void {
    this.router.navigate(['/dashboard/add-supplier']);
  }

  // Pagination Ingredients
  nextPageIngredient(): void {
    if (this.currentPageIngredients < this.totalPagesIngredients) {
      this.getIngredients(this.currentPageIngredients + 1);
    }
  }
  
  prevPageIngredient(): void {
    if (this.currentPageIngredients > 1) {
      this.getIngredients(this.currentPageIngredients - 1);
    }
  }

  // Pagination Suppliers
  nextPageSupplier(): void {
    if (this.currentPageSuppliers < this.totalPagesSuppliers) {
      this.getSuppliers(this.currentPageSuppliers + 1);
    }
  }

  prevPageSupplier(): void {
    if (this.currentPageSuppliers > 1) {
      this.getSuppliers(this.currentPageSuppliers - 1);
    }
  }

}
