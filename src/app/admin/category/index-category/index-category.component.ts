import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Category } from '../../../_interface/category';
import { CategoryService } from '../../../_service/category.service';

@Component({
  selector: 'app-index-category',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './index-category.component.html',
  styleUrl: './index-category.component.css'
})
export class IndexCategoryComponent {
  categories: Category[] = [];
  searchTerm: string = '';
  message: string = '';
  error: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(page: number = 1): void {
    this.categoryService.getAllPaginated(page).subscribe({
      next: (data) => {
        console.log("Liste des catégories", data);
        this.categories = data.data;
        this.currentPage = data.meta.current_page;
        this.totalPages = data.meta.last_page;
        this.message = 'Les catégories ont été chargées avec succès.';
        setTimeout(() => this.message = '', 1000);
      },
      error: (err) => {
        this.message = "Impossible de récupérer les catégories.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }

  searchCategories(): void {
    if (this.searchTerm.trim() === '') {
      this.getCategories();
      return;
    }
    this.categoryService.search(this.searchTerm).subscribe({
      next: (data) => {
        console.log("Liste des catégories", data);
        this.categories = data.data;
        this.currentPage = data.meta.current_page;
        this.totalPages = data.meta.last_page;
        this.message = 'Les catégories ont été chargées avec succès.';
        setTimeout(() => this.message = '', 1000);
      },
      error: (err) => {
        this.message = "Impossible de récupérer les catégories.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }

  toggleStatus(id: number): void {
    this.categoryService.toggleStatus(id).subscribe({
      next: (data) => {
        this.getCategories();
        this.message = 'Statut de la catégorie mis à jour.';
        setTimeout(() => this.message = '', 1000);
      },
      error: (err) => {
        this.message = "Impossible de changer le statut de la catégorie.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }
  
  editCategory(id: number): void {
   this.router.navigate(['/dashboard/edit-categorie', id]);
  }

  addCategory(): void {
    this.router.navigate(['/dashboard/add-categorie']);
  }

  deleteCategory(id: number): void {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.getCategories();
        this.message = 'La catégorie a été supprimée avec succès.';
        setTimeout(() => this.message = '', 1000);
      },
      error: (err) => {
        this.message = "Impossible de supprimer la catégorie.";
        setTimeout(() => this.message = '', 3000);
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.getCategories(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.getCategories(this.currentPage - 1);
    }
  }

}
