import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FooterComponent } from "../../../_utils/footer/footer.component";
import { HeaderComponent } from "../../../_utils/header/header.component";

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

  orderId = '123456';

  steps: Step[] = [
    { title: 'Commande passée', date: '10 Juillet 2024, 10h00', icon: 'fa fa-home', completed: true },
    { title: 'En préparation', date: '10 Juillet 2024, 10h30', icon: 'fa fa-clock', completed: true },
    { title: 'Prête', date: '10 Juillet 2024, 11h00', icon: 'fa fa-bread-slice', completed: true },
    { title: 'En livraison', date: 'En attente', icon: 'fa fa-truck', completed: false },
    { title: 'Livrée', date: 'En attente', icon: 'fa fa-box', completed: false },
  ];

  ngAfterViewInit(): void {
    if (this.progressLine) {
      const completedSteps = this.steps.filter(s => s.completed).length;
      const totalSteps = this.steps.length;
      const progress = (completedSteps - 1) / (totalSteps - 1) * 100;
      this.progressLine.nativeElement.style.height = progress + '%';
    }
  }
}
