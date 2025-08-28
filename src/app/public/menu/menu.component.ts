import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from "../../_utils/footer/footer.component";
import { HeaderComponent } from "../../_utils/header/header.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    FooterComponent,
    HeaderComponent,
    RouterLink
],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  page: number = 1;
  itemsParPage: number = 6;

  produits = [
    { nom: 'Croissant Classique', prix: 3.5, image: '../../../assets/painBlog.png' },
    { nom: 'Cookie Chocolat', prix: 2, image: '../../../assets/painBlog.png' },
    { nom: 'Pain Levain', prix: 5, image: '../../../assets/painBlog.png' },
    { nom: 'Tarte au Citron', prix: 4, image: '../../../assets/painBlog.png' },
    { nom: 'Muffin Myrtilles', prix: 2.5, image: '../../../assets/painBlog.png' },
    { nom: 'Cinnamon Roll', prix: 3, image: '../../../assets/painBlog.png' },
    { nom: 'Baguette Tradition', prix: 1.2, image: '../../../assets/painBlog.png' },
    { nom: 'Éclair au Chocolat', prix: 2.8, image: '../../../assets/painBlog.png' },
    { nom: 'Pain au Chocolat', prix: 1.5, image: '../../../assets/painBlog.png' },
    { nom: 'Madeleine Maison', prix: 1, image: '../../../assets/painBlog.png' }
  ];
}
