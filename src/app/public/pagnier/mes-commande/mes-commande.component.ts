import { Component } from '@angular/core';
import { HeaderComponent } from "../../../_utils/header/header.component";
import { PanierService } from '../../../_service/panier.service';
import { Commande } from '../../../_interface/panier';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mes-commande',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './mes-commande.component.html',
  styleUrl: './mes-commande.component.css'
})
export class MesCommandeComponent {
  commandes: Commande[] = [];
  currentPage = 1;
  pageSize = 5;

  constructor(
    private panierService: PanierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  /** Charger toutes les commandes */
  loadCommandes(): void {
    this.panierService.getMesCommandes().subscribe({
      next: (res: any) => {
        console.log('Mes Commandes ' , res)
        this.commandes = Array.isArray(res.data) ? res.data : [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des commandes', err);
        this.commandes = [];
      }
    });
  }

  /** Pagination simple */
  get pagedCommandes(): Commande[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.commandes.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if ((this.currentPage * this.pageSize) < this.commandes.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  /** Retourner la classe du statut */
  getStatusClass(statut: string): string {
    switch(statut) {
      case 'livree': return 'delivered';
      case 'annulee': return 'cancelled';
      default: return 'status';
    }
  }

  isTrackable(statut: string): boolean {
    return statut !== 'annulee';
  }

  detail(id: number): void {
    this.router.navigate(['/chechout/detailcommandes', id]);
  }
  
  suivi(id: number): void {
    this.router.navigate(['/chechout/ordre', id]);
  }
  
  facture(id: number): void {
    this.router.navigate(['/chechout/facturation', id]);
  }

}
