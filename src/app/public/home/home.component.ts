import { Component } from '@angular/core';
import { HeaderComponent } from "../../_utils/header/header.component";
import { HeroComponent } from "../../_utils/pages/home/hero/hero.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
