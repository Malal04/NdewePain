import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css'
})
export class PromotionComponent {
  // Génération du calendrier dynamique
  currentDate = new Date();
  monthName = this.currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
  daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  daysInMonth: (number | null)[] = [];

  constructor() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay(); // 0 = Dimanche
    const adjustedFirstDay = (firstDay === 0 ? 6 : firstDay - 1);

    const days = new Date(year, month + 1, 0).getDate();

    this.daysInMonth = Array(adjustedFirstDay).fill(null)
      .concat([...Array(days).keys()].map(d => d + 1));
  }

  isToday(day: number | null): boolean {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() &&
           this.currentDate.getMonth() === today.getMonth() &&
           this.currentDate.getFullYear() === today.getFullYear();
  }

}
