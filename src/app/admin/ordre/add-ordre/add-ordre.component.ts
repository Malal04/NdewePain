import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { PanierService } from '../../../_service/panier.service';

@Component({
  selector: 'app-add-ordre',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,   
  ],
  templateUrl: './add-ordre.component.html',
  styleUrl: './add-ordre.component.css'
})
export class AddOrdreComponent {
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
    this.router.navigate(['/dashboard/index-ordre']);
  }

}
