import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Produit } from '../../../../_interface/produit';
import { StockService } from '../../../../_service/stock.service';
import { ProduitService } from '../../../../_service/produit.service';

@Component({
  selector: 'app-edit-stock',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './edit-stock.component.html',
  styleUrl: './edit-stock.component.css'
})
export class EditStockComponent implements OnInit {
  stockForm!: FormGroup;
  produits: Produit[] = [];
  stockId!: number;
  message: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stockId = Number(this.route.snapshot.paramMap.get('id'));

    this.stockForm = this.fb.group({
      produit_id: ['', Validators.required],
      quantite_actuelle: [0, [Validators.required, Validators.min(0)]],
      seuil_minimum: [0, [Validators.required, Validators.min(0)]],
    });

    this.getProduits();
    this.loadStock();
  }

  getProduits(): void {
    this.produitService.getAllProduits().subscribe({
      next: (res) => {
        this.produits = res.data;
      },
      error: () => {
        this.error = "Erreur lors du chargement des produits.";
      }
    });
  }

  loadStock(): void {
    this.stockService.getById(this.stockId).subscribe({
      next: (res) => {
        this.stockForm.patchValue({
          produit_id: res.data?.produit.id,
          quantite_actuelle: res.data?.quantite_actuelle,
          seuil_minimum: res.data?.seuil_minimum,
        });
      },
      error: () => {
        this.error = "Impossible de charger le stock.";
      }
    });
  }

  onSubmit(): void {
    if (this.stockForm.invalid) {
      this.stockForm.markAllAsTouched();
      return;
    }

    this.stockService.update(this.stockId, this.stockForm.value).subscribe({
      next: (res) => {
        this.message = "Stock mis à jour avec succès.";
        this.error = null;
        setTimeout(() => this.router.navigate(['/dashboard/index-stock']), 1500);
      },
      error: (err) => {
        this.error = err.error?.message || "Erreur lors de la mise à jour.";
        this.message = null;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/index-stock']);
  }

}
