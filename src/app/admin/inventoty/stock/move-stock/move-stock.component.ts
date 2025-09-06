import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Produit } from '../../../../_interface/produit';
import { StockService } from '../../../../_service/stock.service';
import { ProduitService } from '../../../../_service/produit.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-move-stock',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './move-stock.component.html',
  styleUrl: './move-stock.component.css'
})
export class MoveStockComponent implements OnInit {
  moveForm!: FormGroup;
  produits: Produit[] = [];
  message: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private stockService: StockService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.moveForm = this.fb.group({
      produit_id: ['', Validators.required],
      type_mouvement: ['', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
      commentaire: [''],
      seuil_minimum: [0, [Validators.min(0)]],
    });

    this.loadProduits();
  }

  loadProduits(): void {
    this.produitService.getAllProduits().subscribe({
      next: (res) => {
        this.produits = res.data;
      },
      error: () => {
        this.error = "Erreur lors du chargement des produits.";
      }
    });
  }

  onSubmit(): void {
    if (this.moveForm.invalid) {
      this.moveForm.markAllAsTouched();
      return;
    }

    this.stockService.move(this.moveForm.value).subscribe({
      next: (res) => {
        this.message ="Mouvement enregistré avec succès.";
        this.error = null;
        setTimeout(() => this.router.navigate(['/dashboard/index-stock']), 1500);
      },
      error: (err) => {
        this.error = err.error?.message || "Erreur lors de l'enregistrement du mouvement.";
        this.message = null;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/index-stock']);
  }
}
