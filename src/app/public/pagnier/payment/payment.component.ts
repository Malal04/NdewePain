import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../_utils/header/header.component";
import { FooterComponent } from "../../../_utils/footer/footer.component";
import { PanierService } from '../../../_service/panier.service';
import { CartResponse } from '../../../_interface/panier';

interface PaymentOption {
  value: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  selectedPayment: string = 'carte';
  message: string = '';
  error: string = '';
  cart?: CartResponse;


  constructor(
    private router: Router,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  paymentOptions: PaymentOption[] = [
    {
      value: 'carte',
      title: 'Carte bancaire en ligne',
      description: 'Payez en toute sécurité avec votre carte de crédit ou de débit.',
      icon: 'fa-credit-card'
    },
    {
      value: 'paiement_a_la_livraison',
      title: 'Paiement à la livraison',
      description: 'Réglez en espèces ou par carte à la réception de votre commande.',
      icon: 'fa fa-box'
    },
    {
      value: 'wave',
      title: 'Wave',
      description: 'Payez facilement et rapidement via l’application Wave.',
      icon: 'fa fa-mobile-screen-button'
    },
    {
      value: 'orange_money',
      title: 'Orange Money',
      description: 'Utilisez votre compte Orange Money pour régler vos achats.',
      icon: 'fa fa-coins'
    }
  ];

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
  

  confirmPayment() {
    console.log('selection payement', this.selectedPayment )
    this.panierService.confirmOrder(this.selectedPayment).subscribe({
      next: (res) => {
        this.message = "Commande confirmée avec succès !";
        console.log("Commande validée :", res);
        this.router.navigate(['/chechout/ordre', res.commande.id]);
      },
      error: (err) => {
        this.error = err.error?.message || "Erreur lors de la confirmation de paiement.";
      }
    });
  }
  

}
