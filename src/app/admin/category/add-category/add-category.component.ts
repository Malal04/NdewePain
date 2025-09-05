import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../_service/category.service';
import { Router } from '@angular/router';
import { Status } from '../../../_enum/dtos';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  message: string = '';
  categoryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      status: [Status.ACTIVE, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.categoryService.create(this.categoryForm.value).subscribe({
        next: () => {
          this.message = 'Catégorie créée avec succès';
          this.router.navigate(['/dashboard/index-categorie']);
        },
        error: () => {
          this.message = 'Erreur lors de la création de la catégorie';
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/index-categorie']);
  }

}
