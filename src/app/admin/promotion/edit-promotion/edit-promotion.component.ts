import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Produit } from '../../../_interface/produit';
import { PromotionService } from '../../../_service/promotion.service';
import { ProduitService } from '../../../_service/produit.service';
import { StatutPromotion, TypeRemise } from '../../../_enum/inventory';
import { Promotion } from '../../../_interface/promotion';
import { ApiResponse } from '../../../_interface/envi';

@Component({
  selector: 'app-edit-promotion',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-promotion.component.html',
  styleUrl: './edit-promotion.component.css'
})
export class EditPromotionComponent  implements OnInit {

  promotionForm!: FormGroup;
  error: string | null = null;
  message: string | null = null;
  produits: Produit[] = [];
  selectedProduits: number[] = [];
  promotionId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private promotionService: PromotionService,
    private produitService: ProduitService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupération de l'ID de la promotion
    this.promotionId = Number(this.route.snapshot.paramMap.get('id'));

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
    this.loadPromotion();
  }

  get f() {
    return this.promotionForm.controls;
  }

  getProduits(): void {
    this.produitService.getAll().subscribe({
      next: (produits) => this.produits = produits.data,
      error: (err) => {
        this.error = 'Erreur lors du chargement des produits';
        console.error(err);
      }
    });
  }

  loadPromotion(): void {
    this.promotionService.getById(this.promotionId).subscribe({
      next: (promo: ApiResponse<Promotion>) => {
        // Pré-remplir le formulaire
        this.promotionForm.patchValue({
          nom: promo.data?.nom,
          description: promo.data?.description,
          type_remise: promo.data?.type_remise,
          valeur_remise: promo.data?.valeur_remise,
          code_promo: promo.data?.code_promo,
          conditions: promo.data?.conditions,
          date_debut: promo.data?.date_debut,
          date_fin: promo.data?.date_fin,
          recurrence: promo.data?.recurrence,
          status: promo.data?.status,
          produit_ids: promo.data?.produits.map(p => p.id)
        });
        this.selectedProduits = promo.data?.produits.map(p => p.id) || [];
      },
      error: (err) => {
        this.error = 'Impossible de charger la promotion';
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
      this.promotionService.update(this.promotionId, this.promotionForm.value).subscribe({
        next: () => {
          this.message = 'Promotion mise à jour avec succès 🎉';
          this.router.navigate(['/dashboard/index-promotion']);
        },
        error: (err) => {
          this.error = 'Échec lors de la mise à jour de la promotion';
          console.error(err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard/index-promotion']);
  }

}
