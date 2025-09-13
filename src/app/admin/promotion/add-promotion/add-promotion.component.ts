import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StatutPromotion, TypeRemise } from '../../../_enum/inventory';
import { PromotionService } from '../../../_service/promotion.service';
import { ProduitService } from '../../../_service/produit.service';
import { Produit } from '../../../_interface/produit';

@Component({
  selector: 'app-add-promotion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './add-promotion.component.html',
  styleUrl: './add-promotion.component.css'
})
export class AddPromotionComponent  implements OnInit {
  promotionForm!: FormGroup;
  error: string | null = null;
  message: string | null = null;
  produits: Produit[] = [];
  selectedProduits: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private promotionService: PromotionService,
    private produitService: ProduitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.promotionForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(190)]],
      description: [''],
      type_remise: [TypeRemise.POURCENTAGE, Validators.required],
      valeur_remise: [null, [Validators.min(0)]],
      code_promo: [''],
      conditions: [''],
      date_debut: [''],
      date_fin: [''],
      recurrence: [''],
      status: [StatutPromotion.ACTIVE],
      produit_ids: [[]]
    });

    this.getProduits();
  }

  get f() {
    return this.promotionForm.controls;
  }

  getProduits(): void {
    this.produitService.getAll().subscribe({
      next: (produits) => {
        this.produits = produits.data;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des produits';
        console.error(err);
      }
    });
  }

  toggleProduit(id: number, event: any): void {
    if (event.target.checked) {
      this.selectedProduits.push(id);
    } else {
      this.selectedProduits = this.selectedProduits.filter(pid => pid !== id);
    }
    this.promotionForm.patchValue({ produit_ids: this.selectedProduits });
  }

  onSubmit(): void {
    if (this.promotionForm.valid) {
      this.promotionService.create(this.promotionForm.value).subscribe({
        next: () => {
          this.message = 'Promotion ajoutée avec succès 🎉';
          this.router.navigate(['/dashboard/index-promotion']);
        },
        error: (err) => {
          this.error = 'Échec lors de l’ajout de la promotion';
          console.error(err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard/index-promotion']);
  }

}
