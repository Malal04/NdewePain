import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FooterComponent } from "../../../_utils/footer/footer.component";
import { HeaderComponent } from "../../../_utils/header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { PanierService } from '../../../_service/panier.service';
import { tick } from '@angular/core/testing';

interface Step {
  title: string;
  date: string;
  icon: string;
  completed: boolean;
}

@Component({
  selector: 'app-ordre',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
  ],
  templateUrl: './ordre.component.html',
  styleUrl: './ordre.component.css'
})
export class OrdreComponent implements AfterViewInit {
  @ViewChild('progressLine') progressLine!: ElementRef<HTMLDivElement>;
  orderId!: number;
  commande: any;
  steps: Step[] = [];

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
        this.initSteps(this.commande);
        this.updateProgress();
      },
      error: (err) => {
        console.error('Erreur chargement commande', err);
      }
    });
  }

  initSteps(commande: any) {
    this.steps = [
      { title: 'Annulée', date: commande.statut_commande === 'annulee' ? commande.updated_at : 'En attente', icon: 'fa fa-times', completed: commande.statut_commande === 'annulee' },
      { title: 'Commande passée', date: commande.created_at, icon: 'fa fa-home', completed: true },
      { title: 'Confirmée', date: commande.statut_commande === 'confirmee' ? commande.updated_at : 'En attente', icon: 'fa fa-check', completed: commande.statut_commande === 'confirmee' || commande.statut_commande === 'en_cours' || commande.statut_commande === 'livree' },
      { title: 'En cours', date: commande.statut_commande === 'en_cours' ? commande.updated_at : 'En attente', icon: 'fa fa-clock', completed: commande.statut_commande === 'en_cours' || commande.statut_commande === 'livree' },
      { title: 'Livrée', date: commande.statut_commande === 'livree' ? commande.updated_at : 'En attente', icon: 'fa fa-box', completed: commande.statut_commande === 'livree' },
    ];
  }

  ngAfterViewInit(): void {
    this.updateProgress();
  }

  updateProgress(): void {
    if (this.progressLine && this.steps.length > 0) {
      const completedSteps = this.steps.filter(s => s.completed).length;
      const totalSteps = this.steps.length;
      const progress = (completedSteps - 1) / (totalSteps - 1) * 100;
      this.progressLine.nativeElement.style.height = progress + '%';
    }
  }

  mes(): void {
    this.router.navigate(['/chechout/mescommandes']);
  }


}
