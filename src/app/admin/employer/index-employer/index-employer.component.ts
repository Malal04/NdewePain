import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '../../../_interface/user';
import { AuthService } from '../../../_service/auth.service';
import { AccountState } from '../../../_enum/dtos';

@Component({
  selector: 'app-index-employer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './index-employer.component.html',
  styleUrl: './index-employer.component.css'
})
export class IndexEmployerComponent {
  employes: User[] = [];
  loading = false;
  error: string | null = null;

  // ✅ Pagination
  currentPage = 1;
  lastPage = 1;
  perPage = 10;
  total = 0;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadEmployes();
  }

  /** Charger les employés & gérants avec pagination */
  loadEmployes(page: number = 1): void {
    this.loading = true;
    this.error = null;
    this.authService.listEmployesEtGerants().subscribe({
      next: (res: any) => {
        console.log('les liste ', res);
        this.employes = res.users ?? [];

        // ✅ récupérer meta pour pagination
        this.currentPage = res.meta?.current_page ?? 1;
        this.lastPage = res.meta?.last_page ?? 1;
        this.perPage = res.meta?.per_page ?? 10;
        this.total = res.meta?.total ?? this.employes.length;

        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement employés', err);
        this.error = 'Impossible de charger les employés';
        this.loading = false;
      }
    });
  }

  /** Changer statut compte */
  toggleStatut(employe: User): void {
    const newState = {
      accountState:
        employe.accountState === AccountState.ACTIVED
          ? AccountState.BLOCKED
          : AccountState.ACTIVED,
    };

    this.authService.updateAccountState(employe.id, newState).subscribe({
      next: () => {
        employe.accountState = newState.accountState;
      },
      error: (err) => {
        console.error('Erreur de changement de statut', err);
        alert('Impossible de changer le statut');
      },
    });
  }

  /** Page suivante */
  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.loadEmployes(this.currentPage + 1);
    }
  }

  /** Page précédente */
  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadEmployes(this.currentPage - 1);
    }
  }

}
