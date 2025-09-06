import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IngredientService } from '../../../../_service/ingredient.service';
import { SupplierService } from '../../../../_service/supplier.service';
import { IngredientOrderService } from '../../../../_service/ingredient-order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-commande',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './add-commande.component.html',
  styleUrl: './add-commande.component.css'
})
export class AddCommandeComponent implements OnInit {
  
  orderForm!: FormGroup;
  ingredients: any[] = [];
  suppliers: any[] = [];
  message: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private ingredientService: IngredientService,
    private supplierService: SupplierService,
    private orderService: IngredientOrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      ingredient_id: ['', []],
      supplier_id:   ['', []],
      quantite:      [0, []],
      statut:        ['en_attente' ]
    });

    this.loadIngredients();
    this.loadSuppliers();
  }

  loadIngredients(): void {
    this.ingredientService.getAll().subscribe({
      next: res => this.ingredients = res.data,
      error: err => this.error = 'Impossible de charger les ingrédients.'
    });
  }

  loadSuppliers(): void {
    this.supplierService.getAll().subscribe({
      next: res => this.suppliers = res.data,
      error: err => this.error = 'Impossible de charger les fournisseurs.'
    });
  }

  onSubmit(): void {
    if (this.orderForm.invalid) return;

    this.orderService.create(this.orderForm.value).subscribe({
      next: res => {
        this.message = 'Commande enregistrée avec succès.';
        this.error = '';
        this.orderForm.reset({ statut: 'en_attente', quantite: 0 });
        this.router.navigate(['/dashboard/index-commande-stock']);
      },
      error: err => {
        this.error = err.error?.message || 'Erreur lors de la création de la commande.';
        this.message = '';
      }
    });
  }

  cancel(): void {
    this.orderForm.reset({ statut: 'en_attente', quantite: 0 });
    this.router.navigate(['/dashboard/index-commande-stock']);
  }

}
