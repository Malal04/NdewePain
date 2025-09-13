import { Component } from '@angular/core';
import { FooterComponent } from "../../_utils/footer/footer.component";
import { HeaderComponent } from "../../_utils/header/header.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Category } from '../../_interface/category';
import { ProduitService } from '../../_service/produit.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Produit, ProduitResponse } from '../../_interface/produit';
import { ApiResponse } from '../../_interface/envi';
import { PanierService } from '../../_service/panier.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,      
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  produit: Produit | null = null;
  related: Produit[] = [];
  message: string = '';
  error: string = '';
  produitId!: number;
  quantity: number = 1; 

  constructor(
    private produitService: ProduitService,
    private panierService: PanierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produitId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduitById();
  }

  getProduitById(): void {
    this.produitService.getProduitById(this.produitId).subscribe({
      next: (response) => {
        if (response.data) {
          this.produit = response.data.produit;
          this.related = response.data.related ?? [];
        } else {
          this.error = 'Produit introuvable';
        }
      },
      error: () => {
        this.error = 'Erreur lors de la récupération du produit';
      },
    });
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    if (!this.produit) return;

    this.panierService.addItem(this.produit.id, this.quantity).subscribe({
      next: (response) => {
        this.message = "Produit ajouté au panier !";
        console.log("Panier mis à jour :", response);
        setTimeout(() => this.message = '', 2500);
        this.router.navigate(['/chechout/cart']);
      },
      error: (err) => {
        this.error = "Erreur lors de l'ajout au panier";
        console.error(err);
        alert('la quantité disponible est de ' + err.error.quantite + ' ' + err.error.message);
        setTimeout(() => this.error = '', 2500);
      }
    });
  }

  viewProduitDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

}
