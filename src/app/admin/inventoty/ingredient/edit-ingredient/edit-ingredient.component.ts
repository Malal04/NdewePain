import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IngredientService } from '../../../../_service/ingredient.service';
import { SupplierService } from '../../../../_service/supplier.service';
import { Supplier } from '../../../../_interface/supplier';

@Component({
  selector: 'app-edit-ingredient',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-ingredient.component.html',
  styleUrl: './edit-ingredient.component.css'
})
export class EditIngredientComponent {

  
  ingredientForm!: FormGroup;
  suppliers: Supplier[] = []; 
  message: string = '';
  error: string = '';
  ingredientId!: number;

  constructor(
    private fb: FormBuilder,
    private ingredientService: IngredientService,
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ingredientForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      quantite: [0, [Validators.required, Validators.min(0)]],
      unite: ['', [Validators.required, Validators.maxLength(50)]],
      seuil_reappro: [0, [Validators.required, Validators.min(0)]],
      supplier_id: ['', [Validators.required]],
    });
    this.ingredientId = Number(this.route.snapshot.paramMap.get('id'));
    this.getIngredient();
    this.getSuppliers();
  }

  get f() {
    return this.ingredientForm.controls;
  }

  getIngredient(): void {
    this.ingredientService.getById(this.ingredientId).subscribe({
      next: (data) => {
        this.ingredientForm.patchValue({
          nom: data.data?.nom,
          quantite: data.data?.quantite,
          unite: data.data?.unite,
          seuil_reappro: data.data?.seuil_reappro,
          supplier_id: data.data?.supplier.id,
        });
      },
      error: () => {
        this.error = "Impossible de charger l'ingrédient.";
      }
    });
  }

  getSuppliers(): void {
    this.supplierService.getAll().subscribe({
      next: (res) => {
        this.suppliers = res.data;
      },
      error: () => {
        this.error = "Impossible de charger les fournisseurs.";
      }
    });
  }

  onSubmit(): void {
    if (this.ingredientForm.invalid) return;

    this.ingredientService.update(this.ingredientId, this.ingredientForm.value).subscribe({
      next: () => {
        this.message = "Ingrédient mis à jour avec succès ";
        setTimeout(() => this.router.navigate(['/dashboard/index-ingredient']), 1500);
      },
      error: () => {
        this.error = "Erreur lors de la mise à jour de l’ingrédient";
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/index-ingredient']);
  }

}
