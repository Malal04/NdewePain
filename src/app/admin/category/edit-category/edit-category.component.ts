import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../_service/category.service';
import { Category, CategoryDto } from '../../../_interface/category';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {
  category: Category [] = [];
  categoryForm!: FormGroup;
  message: string = '';
  categoryId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.categoryId) {
      this.getCategoryById(this.categoryId);
    }

    this.initializeForm();
  }

  private initializeForm(): void {
    this.categoryForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
    });
  }

  private getCategoryById(id: number): void {
    this.categoryService.getById(id).subscribe({
      next: (response) => {
        console.log("Catégorie récupérée", response);
        if (response.status && response.data) {
          this.setFormValues(response.data); 
        } else {
          this.message = 'Erreur lors de la récupération de la catégorie';
        }
      },
      error: () => {
        this.message = 'Erreur lors de la récupération de la catégorie';
      }
    });
  }

  

  private setFormValues(category: Category): void {
    if (category) {
      this.categoryForm.patchValue({
        nom: category.nom ?? '',
        description: category.description ?? '',
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) return;

    const categoryDto: CategoryDto = this.categoryForm.value;
    console.log("Catégorie à envoyer", categoryDto);
    this.categoryService.update(this.categoryId, categoryDto).subscribe({
      next: () => {
        this.message = 'Catégorie mise à jour avec succès';
        setTimeout(() => {
          this.router.navigate(['/dashboard/index-categorie']);
        }, 2000);
      },
      error: () => {
        this.message = 'Erreur lors de la mise à jour de la catégorie';
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/index-categorie']);
  }


}
