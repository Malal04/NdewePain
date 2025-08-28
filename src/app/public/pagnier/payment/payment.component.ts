import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../_utils/header/header.component";
import { FooterComponent } from "../../../_utils/footer/footer.component";

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

  constructor(private router: Router) {}

  paymentOptions: PaymentOption[] = [
    {
      value: 'carte',
      title: 'Carte bancaire en ligne',
      description: 'Payez en toute sécurité avec votre carte de crédit ou de débit.',
      icon: 'fa-credit-card'
    },
    {
      value: 'livraison',
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
      value: 'orange',
      title: 'Orange Money',
      description: 'Utilisez votre compte Orange Money pour régler vos achats.',
      icon: 'fa fa-coins'
    }
  ];

  confirmPayment() {
    alert(`✅ Paiement choisi : ${this.selectedPayment}`);
    this.router.navigate(['/chechout/ordre']);
  }

}
