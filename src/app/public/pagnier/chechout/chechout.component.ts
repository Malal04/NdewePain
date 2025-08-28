import { Component } from '@angular/core';
import { HeaderComponent } from "../../../_utils/header/header.component";
import { FooterComponent } from "../../../_utils/footer/footer.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  constructor(private router: Router) {}
  onSubmit() {
    const loader = document.getElementById("payment-loader");
    if (loader) loader.style.display = "block";
    setTimeout(() => {
      if (loader) loader.style.display = "none";
      this.router.navigate(['/chechout/payment']);
      alert("✅ Paiement confirmé avec succès !");
    }, 3000);
  }
  
}
