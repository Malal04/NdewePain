import { Component } from '@angular/core';
import { HeaderComponent } from "../../../_utils/header/header.component";
import { FooterComponent } from "../../../_utils/footer/footer.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartResponse } from '../../../_interface/panier';
import { PanierService } from '../../../_service/panier.service';

@Component({
  selector: 'app-chechout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent, 
    FooterComponent
  ],
  templateUrl: './chechout.component.html',
  styleUrl: './chechout.component.css'
})
export class ChechoutComponent {
  cart?: CartResponse;
  message: string = '';
  error: string = '';
  promo_code: string = '';


  constructor(
    private router: Router,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  onSubmit() {
    const loader = document.getElementById("payment-loader");
    if (loader) loader.style.display = "block";
    setTimeout(() => {
      if (loader) loader.style.display = "none";
      this.router.navigate(['/chechout/payment']);
      alert("Paiement confirmé avec succès !");
    }, 3000);
  }

  loadCart() {
    this.panierService.getCart().subscribe({
      next: (res) => {
        this.cart = res;
        console.log("Panier chargé", res);
        this.message = "Panier chargé avec succès.";
        setTimeout(() => this.message = '', 3000);
      },
      error: () => {
        this.error = "Impossible de récupérer le panier.";
        setTimeout(() => this.error = '', 3000);
      }
    });
  }

  choisirLivraison(mode: string) {
    const frais = mode === 'livraison' ? 2500 : 0;
    this.panierService.setDeliveryMode(mode, frais).subscribe({
      next: (res) => {
        console.log("Mode de livraison", res);
        this.message = res.message;
        this.loadCart();
      },
      error: (res) => {
        this.error = "Impossible de définir le mode de livraison.";
        setTimeout(() => this.error = '', 3000);
        console.log("Mode de livraison", res);
      }
    });
  }
  
  

  promo(promo_code: string) {

    if (!promo_code.trim()) {
      this.error = "Veuillez entrer un code promo.";
      setTimeout(() => this.error = '', 3000);
      return;
    }
  
    const loader = document.getElementById("payment-loader");
    if (loader) loader.style.display = "block";
  
    this.panierService.promo(promo_code).subscribe({
      next: (res) => {
        console.log("Promo", res);
        this.cart = res as unknown as CartResponse;
        this.message = "Code promo appliqué avec succès";
        setTimeout(() => this.message = '', 4000);
        if (loader) loader.style.display = "none";
      },
      error: (err) => {
        this.error = err.error?.message || "Code promo invalide ";
        setTimeout(() => this.error = '', 4000);
        if (loader) loader.style.display = "none";
      }
    });
  }

  clearCart() {
    if (!confirm("Voulez-vous vraiment vider votre panier ?")) {
      return;
    }
  
    this.panierService.clearCart().subscribe({
      next: (res) => {
        this.cart = res; // retour API vide
        this.message = "Votre panier a été vidé.";
        setTimeout(() => this.message = '', 3000);
      },
      error: () => {
        this.error = "Impossible de vider le panier.";
        setTimeout(() => this.error = '', 3000);
      }
    });
  }
  
}
