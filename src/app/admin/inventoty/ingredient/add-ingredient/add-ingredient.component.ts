import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IngredientService } from '../../../../_service/ingredient.service';
import { SupplierService } from '../../../../_service/supplier.service';
import { StatutIngredient } from '../../../../_enum/inventory';
import { Supplier } from '../../../../_interface/supplier';

@Component({
  selector: 'app-add-ingredient',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './add-ingredient.component.html',
  styleUrl: './add-ingredient.component.css'
})
export class AddIngredientComponent  implements OnInit {
  ingredientForm!: FormGroup;
  error: string = '';
  message: string = '';
  suppliers: Supplier[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ingredientService: IngredientService,
    private supplierService: SupplierService,
  ) {}

  ngOnInit(): void {
    this.ingredientForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      quantite: [0, [Validators.required, Validators.min(0)]],
      unite: ['', [Validators.required, Validators.maxLength(50)]],
      seuil_reappro: [0, [Validators.required, Validators.min(0)]],
      status: [StatutIngredient.OK ],
      supplier_id: ['', [Validators.required]]
    });
    this.getSupplier();
  }

  get f() {
    return this.ingredientForm.controls;
  }

  getSupplier(): void {
    this.supplierService.getAll().subscribe({
      next: (suppliers) => this.suppliers = suppliers.data,
      error: (error) => this.error = error
    });
  }

  onSubmit(): void {
    if (this.ingredientForm.valid) {
      console.log('Formulaire envoyé : ', this.ingredientForm.value);
      this.ingredientService.create(this.ingredientForm.value).subscribe({
        next: () => this.router.navigate(['/dashboard/index-ingredient']),
        error: () => {
          this.message = "Impossible d'ajouter l'ingrédient.";
          setTimeout(() => this.message = '', 3000);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard/index-ingredient']);
  }


}
