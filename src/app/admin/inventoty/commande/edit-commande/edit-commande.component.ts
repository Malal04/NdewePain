import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ingredient } from '../../../../_interface/ingredient';
import { Supplier } from '../../../../_interface/supplier';
import { IngredientOrderService } from '../../../../_service/ingredient-order.service';
import { IngredientService } from '../../../../_service/ingredient.service';
import { SupplierService } from '../../../../_service/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-commande',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './edit-commande.component.html',
  styleUrl: './edit-commande.component.css'
})
export class EditCommandeComponent implements OnInit {
  orderForm!: FormGroup;
  ingredients: Ingredient[] = [];
  suppliers: Supplier[] = [];
  orderId!: number;
  message: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private orderService: IngredientOrderService,
    private ingredientService: IngredientService,
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadIngredients();
    this.loadSuppliers();
    this.loadOrder();
  }

  private initForm(): void {
    this.orderForm = this.fb.group({
      ingredient_id: [''],
      supplier_id: [''],
      quantite: [''],
      statut: ['en_attente']
    });
  }

  private loadIngredients(): void {
    this.ingredientService.getAll().subscribe({
      next: res => this.ingredients = res.data,
      error: err => this.error = 'Erreur lors du chargement des ingrédients.'
    });
  }

  private loadSuppliers(): void {
    this.supplierService.getAll().subscribe({
      next: res => this.suppliers = res.data,
      error: err => this.error = 'Erreur lors du chargement des fournisseurs.'
    });
  }

  private loadOrder(): void {
    this.orderService.getById(this.orderId).subscribe({
      next: res => {
        this.orderForm.patchValue({
          ingredient_id: res.data?.ingredient.id,
          supplier_id: res.data?.supplier.id,
          quantite: res.data?.quantite,
          statut: res.data?.statut
        });
      },
      error: () => this.error = 'Impossible de charger la commande.'
    });
  }

  onSubmit(): void {
    if (this.orderForm.invalid) return;

    this.orderService.update(this.orderId, this.orderForm.value).subscribe({
      next: () => {
        this.message = 'Commande mise à jour avec succès.';
        setTimeout(() => this.router.navigate(['/dashboard/index-commande-stock']), 1500);
      },
      error: () => this.error = 'Erreur lors de la mise à jour de la commande.'
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/commande-stock']);
  }

}
