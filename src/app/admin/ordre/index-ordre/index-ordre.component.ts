import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Commande } from '../../../_interface/panier';
import { PanierService } from '../../../_service/panier.service';

@Component({
  selector: 'app-index-ordre',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './index-ordre.component.html',
  styleUrl: './index-ordre.component.css'
})
export class IndexOrdreComponent {
  commandes: Commande[] = [];
  currentPage = 1;
  pageSize = 15;
  searchTerm: string = '';
  selectedStatus: string = 'all';
  selectedDate: string = '';

  constructor(
    private panierService: PanierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.panierService.getCommandes().subscribe({
      next: (res: any) => {
        console.log('Mes Commandes ' , res);
        this.commandes = Array.isArray(res.data) ? res.data : [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des commandes', err);
        this.commandes = [];
      }
    });
  }

  get filteredCommandes(): Commande[] {
    return this.commandes.filter(cmd => {
      const matchesSearch =
        cmd.code_commande.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cmd.user?.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
  
      const matchesStatus =
        this.selectedStatus === 'all' || cmd.statut_commande === this.selectedStatus;
  
      const matchesDate =
        !this.selectedDate ||
        new Date(cmd.created_at).toLocaleDateString() ===
          new Date(this.selectedDate).toLocaleDateString();
  
      return matchesSearch && matchesStatus && matchesDate;
    });
  }

  get pagedCommandes(): Commande[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCommandes.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if ((this.currentPage * this.pageSize) < this.filteredCommandes.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }
 
  voirCommande(id: number): void {
    this.router.navigate(['/dashboard/add-ordre', id]);
  }

  modifierCommande(id: number): void {
    this.router.navigate(['/checkout/edit-commande', id]);
  }

  changerStatut(id: number, nouveauStatut: string): void {
    this.panierService.updateStatutCommande(id, nouveauStatut).subscribe({
      next: (res) => {
        console.log(`Commande ${id} mise à jour :`, res);
        alert(`Statut de la commande #${id} changé en ${nouveauStatut}`);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut', err);
        alert('Impossible de changer le statut de la commande.');
        this.loadCommandes();
      }
    });
  } 
  
}
