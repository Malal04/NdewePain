import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanierService } from '../../../_service/panier.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../_utils/header/header.component";
import { FooterComponent } from "../../../_utils/footer/footer.component";

@Component({
  selector: 'app-detail-commande',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './detail-commande.component.html',
  styleUrl: './detail-commande.component.css'
})
export class DetailCommandeComponent {
  orderId!: number;
  commande: any;

  constructor(
    private route: ActivatedRoute,
    private panierService: PanierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    this.panierService.getDetailCommande(this.orderId).subscribe({
      next: (res) => {
        console.log('Mon commande ' , res)
        this.commande = res.data;
      },
      error: (err) => {
        console.error('Erreur chargement commande', err);
      }
    });
  }

  mescommande(): void {
    this.router.navigate(['/chechout/mescommandes']);
  }

  

}
