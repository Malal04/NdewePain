import { Component } from '@angular/core';
import { HeaderComponent } from "../../_utils/header/header.component";
import { FooterComponent } from "../../_utils/footer/footer.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../_interface/user';
import { Adresse } from '../../_interface/adresse';
import { Commande } from '../../_interface/panier';
import { AuthService } from '../../_service/auth.service';
import { PanierService } from '../../_service/panier.service';
import { AdresseService } from '../../_service/adresse.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    HeaderComponent, 
    FooterComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  user: User | null = null;
  adresses: Adresse[] = [];
  commandes: Commande[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private adresseService: AdresseService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  /** Charger profil, adresses et commandes */
  loadProfile(): void {
    this.loading = true;
    this.error = null;

    this.authService.me().subscribe({
      next: (res: any) => {
        console.log('profile', res);
        this.user = res.user; 
        this.loadAdresses();
        this.loadCommandes();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur profil', err);
        this.error = 'Impossible de charger le profil';
        this.loading = false;
      }
    });
  }

  loadAdresses(): void {
    this.adresseService.getAll().subscribe({
      next: (res: any) => {
        console.log('adresses', res);
        this.adresses = res.adresses ?? []; 
      },
      error: (err) => {
        console.error('Erreur adresses', err);
      }
    });
  }

  loadCommandes(): void {
    this.panierService.getMesCommandes().subscribe({
      next: (res: any) => {
        console.log('mes commandes', res);
        this.commandes = res.data ?? []; 
      },
      error: (err) => {
        console.error('Erreur commandes', err);
      }
    });
  }

  updateProfile(id: number): void {
    this.router.navigate(['/setting', id]);
  }

  addprofil(): void {
    this.router.navigate(['/add-profil']);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur logout', err);
      }
    });
  }

}
