import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StockService } from '../../../../_service/stock.service';
import { ProduitService } from '../../../../_service/produit.service';
import { Produit } from '../../../../_interface/produit';

@Component({
  selector: 'app-add-stock',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-stock.component.html',
  styleUrl: './add-stock.component.css'
})
export class AddStockComponent implements OnInit {
  stockForm!: FormGroup;
  produits: Produit[] = [];
  message: string | null = null;
  error: string | null = null;

  constructor(
    private router: Router,
    private stockService: StockService,
    private produitService: ProduitService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      produit_id: ['', Validators.required],
      quantite_actuelle: [0, [Validators.min(0)]],
      seuil_minimum: [0, [Validators.min(0)]],
    });
    this.getProduits();
  }

  getProduits(): void {
    this.produitService.getAllProduits().subscribe({
      next: (response) => {
        console.log("liste produit", response);
        this.produits = response.data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits:', err);
        this.error = "Impossible de charger la liste des produits.";
      }
    });
  }

  onSubmit(): void {
    if (this.stockForm.invalid) {
      this.stockForm.markAllAsTouched();
      return;
    }

    this.stockService.create(this.stockForm.value).subscribe({
      next: (response) => {
        this.message = "Stock créé avec succès.";
        this.error = null;
        setTimeout(() => this.router.navigate(['/dashboard/index-stock']), 1500);
      },
      error: (err) => {
        console.error('Erreur création stock:', err);
        this.error = err.error?.message || "Erreur lors de la création du stock.";
        this.message = null;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/index-stock']);
  }

}
