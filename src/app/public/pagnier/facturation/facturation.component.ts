import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanierService } from '../../../_service/panier.service';
import { CommonModule } from '@angular/common';
import html2pdf from 'html2pdf.js';
import { HeaderComponent } from "../../../_utils/header/header.component";
import { FooterComponent } from "../../../_utils/footer/footer.component";

@Component({
  selector: 'app-facturation',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './facturation.component.html',
  styleUrl: './facturation.component.css'
})
export class  FacturationComponent {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
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

    imprimer() {
      const content: HTMLElement = this.pdfContent.nativeElement;
      const actions = content.querySelector('.actions') as HTMLElement;

      if (actions) actions.style.display = 'none'
      const opt = {
        margin: 0.5,
        filename: `facture_${this.commande.code_commande}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: 'cm',
          format: 'a4',
          orientation: 'portrait' as const
        }
      };
    
      html2pdf().set(opt).from(content).toPdf().get('pdf').then((pdf: any) => {
        const blob = pdf.output('blob');
        const blobUrl = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
        window.open(blobUrl, '_blank'); 
      });
    }
  
    mescommande(): void {
      this.router.navigate(['/chechout/mescommandes']);
    }

}
